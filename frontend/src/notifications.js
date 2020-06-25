//Start subscription
const publicVapidKey = 'public key of server';

export const setupNotifications = () => {
	if (window.Notification) {
		if (Notification.permission != 'granted') {
			Notification.requestPermission(() => {
				if (Notification.permission === 'granted') {
					getSubscriptionObject().then(subscribe);
				}
			}).catch(function (err) {
				console.log(err);
			});
		}
	}
};

//Generate subscription object
function getSubscriptionObject() {
	return navigator.serviceWorker
		.register('/layout/service-worker-push.js')
		.then((worker) => {
			return worker.pushManager
				.subscribe({
					userVisibleOnly: true,
					applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
				})
				.catch(function (err) {
					console.log(err);
				});
		})
		.catch(function (err) {
			console.log(err);
		});
}

//Send subscription to server
function subscribe(subscription) {
	/* return fetch(window.location.origin + '/subscribe', {
		method: 'POST',
		body: JSON.stringify({
			subscription: subscription,
			userId: mv.user_id != undefined ? mv.user_id : '',
		}),
		headers: {
			'content-type': 'application/json',
		},
	}).catch(function (err) {
		console.log(err);
    }); */
	console.log('subscribe');
}

//Decoder base64 to uint8
function urlBase64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);
	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}
