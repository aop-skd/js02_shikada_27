// 保存の操作

  $("#add_btn").on("click",function(){
    // keyとvalueの宣言
    const key = $("#add_text").val();
    console.log(key, "keyの確認");
    
    const value =$("#add_date").val();
    console.log(value, "valueの確認");

    // ローカルストレイジへの保存
    localStorage.setItem(key, value);
    
    //HTML用のデータを準備 
    const todoNew = `
    <tr class=items_each>
      <th class="todo_each">${key}</th>
      <td><i class="fas fa-fire-alt" style="color:white;"></i></td>   
      <td class="date_each">${value}</td>
      <td class="update_each"><i class="fas fa-check-square" style="color:blue;"></i></td>
      <td class="delete_each"><i class="fas fa-trash-alt" style="color:red;"></i></td>
    </tr>
    `;

    //HTMLに渡す 
    $("#todoList").append(todoNew);

      // 個別削除ボタン機能を入れておく。
        $(".delete_each").on("click", function () {
          // 鍵を指定する
          const xx = $(this).parent().children("th").text(); 

          localStorage.removeItem(xx);
          $(this).parent().empty();

        });

      // 個別完了ボタン機能を入れておく。
        $(".update_each").on("click", function () {

        // 完了のほうに複製される
        const keyDone = $(this).parent().children("th").text();
        const valueDone = $(this).parent().children(".date_each").text();

        const doneNew = `
        <tr class=items_each>
          <th class="todo_done">${keyDone}</th>
          <td class="date_done">${valueDone}</td>
        </tr>
        `;

        $("#doneList").append(doneNew);
      
        // 鍵を指定する
        const xx = $(this).parent().children("th").text(); 
        console.log(xx);
        
        localStorage.removeItem(xx);
        $(this).parent().empty();

      // 炎の色を調整する
        const date1 = Date.parse(value);
        const date2 = new Date();
        const date3 = (date1 - date2) / 86400000;
          console.log(date1, "締め切りの日付確認");
          console.log(date2, "本日の日付確認");
          console.log(date3, "差分表示");
        
        if(date3 < 3){
          $(".fa-fire-alt").css('color','red');
        };

    });
    
    //入力後フォームをきれいにする
    list.reset(); 


  });


// リストを全て削除する

  $("#delete_btn").on("click", function(){
    // 本当に削除して良いのかの確認
    let confm = confirm("全てのデータが削除されますがよろしいですか？");
    if(confm){
      localStorage.clear();
      $("#todoList").empty();
    };

  });

// ページ読み込み：保存データの表示
  for(let i = 0; i<localStorage.length; i++){
    const key =localStorage.key(i);
    const value = localStorage.getItem(key);

    const html = `
    <tr class=items_each>
      <th class="todo_each">${key}</th>
      <td><i class="fas fa-fire-alt" style="color:white";></i></td>
      <td class="date_each">${value}</td>
      <td class="update_each"><i class="fas fa-check-square" style="color:blue;"></i></td>
      <td class="delete_each"><i class="fas fa-trash-alt" style="color:red;"></i></td>
    </tr>

    `;

    $("#todoList").append(html);

    // 炎の色を調整
    const date1 = Date.parse(value);
    const date2 = new Date();
    const date3 = (date1 - date2) / 86400000;
      console.log(date1, "締め切りの日付確認");
      console.log(date2, "本日の日付確認");
      console.log(date3, "差分表示");
    
    if(date3 < 3){
      $(".fa-fire-alt").css('color','red');
    };


  };


// 個別削除ボタン
  $(".delete_each").on("click", function () {
    // 鍵を指定する
    const xx = $(this).parent().children("th").text(); 
    console.log(xx);
    


    localStorage.removeItem(xx);
    $(this).parent().empty();

  });

// 個別完了ボタン
  $(".update_each").on("click", function () {

    // 完了のほうに複製される
    const keyDone = $(this).parent().children("th").text();
    const valueDone = $(this).parent().children(".date_each").text();

    const doneNew = `
    <tr class=items_each>
      <th class="todo_done">${keyDone}</th>
      <td class="date_done">${valueDone}</td>
    </tr>
    `;

    $("#doneList").append(doneNew);
  
    //local storageとTODOから消す 
    localStorage.removeItem(keyDone);
    $(this).parent().empty();

    // かえるさんに話をさせる
    const q =Math.floor(Math.random()*3);
    if(q === 0){
    $("h1").html('<i class="fas fa-frog" style="color:#d3E17e;"></i>  "Good job!"')
    } else if(q === 1){
    $("h1").html('<i class="fas fa-frog" style="color:#d3E17e;"></i>  "Take it easy~"')
    }else{
      $("h1").html('<i class="fas fa-frog" style="color:#d3E17e;"></i>  "Well done!"');
    };

  });

