$(function(){
	// 表示する場所と入力フォーム
	let viewEl = $("#viewList");
	let inputEl = $("#todoInput");

	// HTML読み込み時にストレージから表示
	let storageList = localStorage["todo.list"];
	if(storageList){
		JSON.parse(storageList).forEach(function(itemEl){
			addTodo(itemEl.text,itemEl.complete);
		});
	}

	// フォームを送信したとき
	$("#todoForm").on("submit",function(e){
		// 送信を止めて処理をする
		e.preventDefault();

		// 入力文字を取得
		let text = inputEl.val();

		// 入力がなかった場合追加しない
		if(text === ""){
			return ;
		}

		// <ul>に追加
		addTodo(text);

		// テキストボックスを空に
		inputEl.val("");

		// LocalStorageを更新
		updateStorage();
	});

	// Todoを追加する関数
	function addTodo(text,isComplete){
		// リストアイテムを作成
		let liEl = $("<li>");
		let textEl = $('<span id = "text" contenteditable="true">').text(text);
		let checkboxEl = $('<input type = "checkbox" id = "compcheck">');
		let deleteEl = $('<button id = "deletebtn"><i class="far fa-trash-alt fa-3x"></i></button>');
		let editEl = $('<button id = "editbtn" data-iziModal-open=".iziModal"><i class="far fa-save fa-3x"></i></button>')

		// 完了の場合
		if(isComplete){
			liEl.addClass("complete");
			checkboxEl.attr("checked",true);
		}

		// 追加する要素の作成
		liEl.append(checkboxEl).append(textEl).append(editEl).append(deleteEl);

		// リストの先頭に追加する
		viewEl.prepend(liEl).hide().fadeIn(400);

		// チェックボックスをクリックしたとき
		checkboxEl.click(function(){
			// thisはinputタグを指す
			if($(this).is(":checked")){
				liEl.addClass("complete");
			}
			else{
				liEl.removeClass("complete");
			}
			// LocalStorageを更新
			updateStorage();
		});

		// 削除ボタンが押されたとき
		deleteEl.click(function(){
			// アラート表示
			if(window.confirm("削除してもよろしいですか？")){
				// li　をフェードアウトし LocalStorage から削除
				liEl.fadeOut(400, function(){
					liEl.remove();
					updateStorage();
				});
			}
			// LocalStorageを更新
			//updateStorage();
		});

		// 確定ボタンが押されたとき
		editEl.click(function(){
			// LocalStorageを更新
			updateStorage();
			// ダイアログを出す
			$(".iziModal").iziModal({timeout : 900, padding : 5　,top: 10});
		});
	}

	// LocalStorageを更新する関数
	function updateStorage(){
		let storage = [];

		// 現在のリストを全て取得
		viewEl.find("li").each(function(){

			// li要素を指す
			let itemEl = $(this);

			// テキストとチェックボックスの状態を保存
			storage.unshift({
				text:itemEl.find("#text").text(),
				complete:itemEl.hasClass("complete")
			});
		});
		// 文字列にして保存
		localStorage["todo.list"] = JSON.stringify(storage);
	}
});