function lulusBootcamp(status) {
	return new Promise((resolve, reject) => {
		if (status === false) {
			reject('Anda harus ulang');
		} else {
			resolve('Yay! Anda adalah developer PRO!')
		}
	});
}

function cariKerja(status) {
	return new Promise((resolve, reject) => {
		if (status === true) {
			resolve('Ya! Anda masuk Startup or Corporate mantap!');
		} else {
			reject('Searching job dulu deh..');
		}
	});
}

lulusBootcamp(true)
	.then(function(success) {
		return cariKerja(false);
	})
	.then(function(success) {
		console.log(success);
	})
	.catch(function(error) {
		console.log(error);
	})

// Promise.all([lulusBootcamp(true), cariKerja(false)])
// 	.then(function(success){
// 		console.log(success[0]);
// 		console.log(success[1]);
// 	})
// 	.catch(function(error) {
// 		console.log(error, "Masuk sini");
// 	});