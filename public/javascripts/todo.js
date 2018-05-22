$(function () {
	// 表示する場所と入力フォーム
	const viewEl = $("#viewList");
	const inputEl = $("#todoInput");

	// 読み込み時に表示
	$.ajax({
		url: 'http://localhost:3000/all',
		type: 'GET'
	})
		.done((res) => {
			// 通信成功時の処理を記述
			// 描画処理
			//console.log(res);

			for (let i = 0; i < res.length; i++) {
				let liEl = $("<li>");
				let textEl = $('<span id = "text" contenteditable="true">').text(res[i].text);
				let deleteEl = $('<button id = "deletebtn"><i class="far fa-trash-alt fa-3x"></i></button>');
				let editEl = $('<button id = "editbtn" data-iziModal-open=".iziModal"><i class="far fa-save fa-3x"></i></button>')
				// 追加する要素の作成
				liEl.append(textEl).append(editEl).append(deleteEl);
				viewEl.prepend(liEl);

				// 削除ボタンが押されたとき
				deleteEl.on("click", function () {
					// アラート表示
					if (window.confirm("削除してもよろしいですか？")) {
						// li　をフェードアウトし LocalStorage から削除
						liEl.fadeOut(400, function () {
							liEl.remove();
							$.ajax({
								url: '/delete',
								type: 'DELETE',
								data: {
									_id: res[i]._id //削除するデータ
								}
							})
								.done((res) => {
									// 通信成功時の処理を記述
									//console.log(res);
								})
								.fail(() => {
									// 通信失敗時の処理を記述
								});
						});
					}
				});

				// 確定ボタンが押されたとき
				editEl.on("click", function () {
					//const textEl = $("#text");
					//let text = $("#text").text();
					let text = $(this).parent().text();

					console.log(text);
					
					
					$.ajax({
						url: '/update',
						type: 'PUT',
						data: {
							_id: res[i]._id,
							text: text, //更新するデータ
						}
					})
						.done((res) => {
							// 通信成功時の処理を記述
							//console.log(res);
						})
						.fail(() => {
							// 通信失敗時の処理を記述
						});
					// 保存ダイアログを出す
					//$(".iziModal").iziModal({ timeout: 900, padding: 5, top: 10 });
				});
			}


			// for (let i = 0; i < res.length; i++) {

			// }
		})
		.fail(() => {
			// 通信失敗時の処理を記述
		});

	// フォームを送信したときの処理
	$("#todoForm").on("click", function () {
		// 入力文字を取得
		const text = inputEl.val();

		// 入力がなかった場合追加しない
		if (text === "") {
			return false;
		};


		// テキストボックスを空に
		inputEl.val("");

		$.ajax({
			url: 'http://localhost:3000/',
			type: 'POST',
			data: {
				text: text,
				complete: false
			}
		})
			.done((res) => {
				// 通信成功時の処理を記述
				console.log(res);
			})
			.fail(() => {
				// 通信失敗時の処理を記述
			});
	});
});