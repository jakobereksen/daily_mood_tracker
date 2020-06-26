const subscription = {
	endpoint: 'recover from DB',
	expirationTime: null,
	keys: {
		p256dh: 'recover from DB',
		auth: 'recover from DB'
	}
};
const payload = JSON.stringify({
	title: 'Notification Title',
	body: 'Notification message'
});
webpush.setVapidDetails(
	process.env.DOMAIN,
	process.env.PUBLIC_VAPID_KEY,
	process.env.PRIVATE_VAPID_KEY
);
webpush.sendNotification(subscription, payload)
	.catch(function(err) {
		console.log(err);
	});

