const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../data/db');
const crypto = require('crypto');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Auto-generate a futuristic avatar based on name using DiceBear Bottts
const generateAvatar = (name) => {
  return `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`;
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please add all fields' });
  }

  db.get(`SELECT email FROM users WHERE email = ?`, [email], async (err, row) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (row) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const id = Date.now().toString();
    const avatar = generateAvatar(name);

    db.run(
      `INSERT INTO users (id, name, email, password, avatar) VALUES (?, ?, ?, ?, ?)`,
      [id, name, email, hashedPassword, avatar],
      function (err) {
        if (err) return res.status(500).json({ message: 'Error creating user' });

        res.status(201).json({
          _id: id,
          name,
          email,
          avatar,
          token: generateToken(id),
        });
      }
    );
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err) return res.status(500).json({ message: 'Server error' });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
};

const getProfile = (req, res) => {
  res.status(200).json(req.user);
};

// Forgot Password
const forgotPassword = (req, res) => {
  const { email } = req.body;

  db.get(`SELECT id FROM users WHERE email = ?`, [email], (err, user) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const resetToken = crypto.randomBytes(32).toString('hex');

    db.run(`UPDATE users SET resetToken = ? WHERE email = ?`, [resetToken, email], (err) => {
      if (err) return res.status(500).json({ message: 'Error generating reset token' });

      // SIMULATING EMAIL SEND
      const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
      console.log(`\n================================\nRESET LINK FOR ${email}:\n${resetLink}\n================================\n`);

      res.status(200).json({ message: 'Password reset link sent (check server console)', resetToken });
    });
  });
};

// Reset Password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) return res.status(400).json({ message: 'Password is required' });

  db.get(`SELECT id FROM users WHERE resetToken = ?`, [token], async (err, user) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    db.run(
      `UPDATE users SET password = ?, resetToken = NULL WHERE id = ?`,
      [hashedPassword, user.id],
      (err) => {
        if (err) return res.status(500).json({ message: 'Error resetting password' });
        res.status(200).json({ message: 'Password reset successfully' });
      }
    );
  });
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  forgotPassword,
  resetPassword,
};
