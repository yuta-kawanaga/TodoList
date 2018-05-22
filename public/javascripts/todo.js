$(function () {
	// 表示する場所
	const viewEl = $("#viewList");

	// 読み込み時
	$.ajax({
		url: 'http://localhost:3000/all',
		type: 'GET'
	})
		.done((res) => {
			// 成功時表示処理
			for (let i = 0; i < res.length; i++) {
				// 追加する要素の作成
				const liEl = $("<li>");
				const textEl = $('<span id = "text" contenteditable="true">').text(res[i].text);
				const deleteBtn = createDeleteBtn(res, i, liEl);
				const saveBtn = createSaveBtn(res, i, liEl);

				liEl.append(textEl).append(saveBtn).append(deleteBtn);

				viewEl.prepend(liEl).hide().fadeIn(400);
			}
		});
	// フォームを送信したときの処理
	sendForm();
});

// 入力内容をajaxで送信
function sendForm() {
	// 入力欄
	const inputEl = $("#todoInput");

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
		});
	});
}


// 削除ボタンを作る関数
function createDeleteBtn(res, i, liEl) {
	const deleteBtn = $('<button id = "deletebtn"><i class="far fa-trash-alt fa-3x"></i></button>');
	// 削除ボタンが押されたとき
	deleteBtn.on("click", function () {
		// アラート表示
		if (window.confirm("削除してもよろしいですか？")) {
			liEl.fadeOut(400, function () {
				liEl.remove();
				$.ajax({
					url: '/delete',
					type: 'DELETE',
					data: {
						_id: res[i]._id
					}
				});
			});
		}
	});
	return deleteBtn;
}

// 保存ボタンを作る関数
function createSaveBtn(res, i, liEl) {
	let saveBtn = $('<button id = "editbtn" data-iziModal-open=".iziModal"><i class="far fa-save fa-3x"></i></button>')
	// 保存ボタンが押されたとき
	saveBtn.on("click", function () {

		let text = $(this).parent().text();

		$.ajax({
			url: '/update',
			type: 'PUT',
			data: {
				_id: res[i]._id,
				text: text //更新するデータ
			}
		});
		// 保存ダイアログを出す
		alert("保存しました。");
	});
	return saveBtn;
}
