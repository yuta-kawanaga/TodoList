$(function () {
	// 表示する場所と入力フォーム
	const viewEl = $("#viewList");
	const inputEl = $("#todoInput");

	// HTML読み込み時にLocalStorageの内容を表示
	const storageList = localStorage.getItem("todoList");
	if (storageList) {
		JSON.parse(storageList).forEach(function (itemEl) {
			addTodo(itemEl.text, itemEl.complete);
		});
	};

	// フォームを送信したときの処理
	$("#todoForm").on("click", function () {
		// 入力文字を取得
		const text = inputEl.val();

		// 入力がなかった場合追加しない
		if (text === "") {
			return false;
		};

		// <ul>に追加
		addTodo(text);

		// テキストボックスを空に
		inputEl.val("");

		// LocalStorageを更新
		updateStorage();
	});

	// Todoを追加する関数
	function addTodo(text, isComplete) {
		// リストアイテムを作成
		let liEl = $("<li>");
		let textEl = $('<span id = "text" contenteditable="true">').text(text);
		let checkboxEl = $('<input type = "checkbox" id = "compcheck">');
		let deleteEl = $('<button id = "deletebtn"><i class="far fa-trash-alt fa-3x"></i></button>');
		let editEl = $('<button id = "editbtn" data-iziModal-open=".iziModal"><i class="far fa-save fa-3x"></i></button>')

		// 完了の場合
		if (isComplete) {
			liEl.addClass("complete");
			checkboxEl.attr("checked", true);
		}

		// 追加する要素の作成
		liEl.append(checkboxEl).append(textEl).append(editEl).append(deleteEl);

		// リストの先頭にフェードインで追加する
		viewEl.prepend(liEl).hide().fadeIn(400);

		// チェックボックスをクリックしたとき
		checkboxEl.on("click", function () {
			// thisはcheckboxを指す
			if ($(this).is(":checked")) {
				liEl.addClass("complete");
			}
			else {
				liEl.removeClass("complete");
			}
			// LocalStorage を更新
			updateStorage();
		});

		// 削除ボタンが押されたとき
		deleteEl.on("click", function () {
			// アラート表示
			if (window.confirm("削除してもよろしいですか？")) {
				// li　をフェードアウトし LocalStorage から削除
				liEl.fadeOut(400, function () {
					liEl.remove();
					updateStorage();
				});
			}
		});

		// 確定ボタンが押されたとき
		editEl.on("click", function () {
			// LocalStorageを更新
			updateStorage();
			// 保存ダイアログを出す
			$(".iziModal").iziModal({ timeout: 900, padding: 5, top: 10 });
		});
	}

	// LocalStorageを更新する関数
	function updateStorage() {
		// LocalStorageに送る用の配列
		let storage = [];

		// 現在のリストを全て取得
		viewEl.find("li").each(function () {

			// thisはli要素を指す
			const itemEl = $(this);

			// テキストとチェックボックスの状態を先頭に追加
			storage.unshift({
				text: itemEl.find("#text").text(),
				complete: itemEl.hasClass("complete")
			});
		});

		// オブジェクト　=> JSON文字列　に変更
		const json = JSON.stringify(storage);

		// ローカルストレージにデータを保存
		localStorage.setItem("todoList", json);
	};
});