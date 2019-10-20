require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

/* routes */
const healthRouter = require('./routes/health');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');
const likeRouter = require('./routes/like');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* routes middleware */
app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.use('/api/likes', likeRouter);

app.listen(PORT, () => {
  console.log(`App is running on port: ${ PORT }`);
});
