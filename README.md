# Chatter-Box

An online chat application that helps you learn languages by talking to native speakers through text, voice, or video calls.

![JavaScript](https://img.shields.io/badge/JavaScript-99.4%25-yellow)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

## Features

- **Real-time Communication**: Text, voice, and video calls
- **Language Matching**: Connect with native speakers worldwide  
- **Cross-platform**: Works on web browsers and mobile devices
- **Secure Authentication**: JWT-based user authentication

## Tech Stack

- **Frontend**: JavaScript (ES6+), HTML5, CSS3
- **Backend**: Node.js, Express.js
- **Real-time**: Socket.IO
- **Video/Voice**: WebRTC
- **Database**: MongoDB
- **Auth**: JWT

## Quick Start

**1. Clone and install**

```
git clone https://github.com/cpsurfer/chatter-box.git
cd chatter-box
npm install
```

**2. Set up environment**

```
cp .env.example .env
```

Edit `.env` with your MongoDB URI and JWT secret

**3. Run the application**

```
npm run dev
```

**4. Access at** `http://localhost:3000`

## Usage

1. **Sign up** with your native and target languages
2. **Find partners** - Browse native speakers of your target language
3. **Start chatting** - Use text, voice, or video calls
4. **Learn & teach** - Practice languages in real conversations

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/chats` - Get chat rooms
- `POST /api/chats` - Create chat room
- `GET /api/users/search` - Find language partners

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**cpsurfer** - [GitHub Profile](https://github.com/cpsurfer)

## Support

- ⭐ Star this repo if you find it helpful!
- 🐛 [Report bugs](https://github.com/cpsurfer/chatter-box/issues)
- 💬 Questions? Open an issue

---

Made with ❤️ for language learners worldwide
```


