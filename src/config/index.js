require('dotenv').config();

const config = {
	dev: process.env.NODE_ENV !== 'production',
	port: process.env.PORT || 3000,
	DB_CONNECTION: process.env.DB_CONNECTION,
	jwt_secret: process.env.JWT_SECRET,
	github_client_id: process.env.GITHUB_CLIENT_ID,
	github_client_secret: process.env.GITHUB_CLIENT_SECRET,
	github_redirect: process.env.GITHUB_REDIRECT,
	github_access_token_url: 'https://github.com/login/oauth/access_token',
	github_user_data_url: 'https://api.github.com/user',
	mail_name: process.env.ETHEREAL_NAME,
	mail_username: process.env.ETHEREAL_USERNAME,
	mail_password: process.env.ETHEREAL_PASSWORD,
	//	AWS
	aws_access_id: process.env.AWS_ACCESS_KEY_ID,
	aws_access_secret: process.env.AWS_ACCESS_SECRET,
	aws_bucket_name: process.env.AWS_BUCKET_NAME
};

module.exports = { config };
