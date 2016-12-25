var dispFlg = true;

$(function(){
  //1ツールチップ表示のイベントトリガー
  if(dispFlg) {
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="tooltip"]').on('hidden.bs.tooltip', function () {
      $('[data-toggle="tooltip"]').tooltip('destroy');
    })
  }
  
  $('#finishedModal').on('hidden.bs.modal',function(){
    /* !!!!!!!!!!!!!!!!!
     * 開発時正しいURLに変更してください
     * !!!!!!!!!!!!!!!!! */
    location.href = 'approval.html';
  });
  
  //******************************************
  // ログインボタン押下時
  //******************************************
  $('.btn-submit').on('touchstart',function(e){
    /* !!!!!!!!!!!!!!!!!
     * 以下テスト用の処理。開発時に削除してください
     * !!!!!!!!!!!!!!!!! */
    
    var id = "tfhd";
    var pw = "tfhd2016";
    var form = $('#loginForm');
    if(form.find('input[name=id]')[0].value == id && form.find('input[name=password]')[0].value == pw){
      form.submit();
    } else {
      /* !!!!!!!!!!!!!!!!!
       * アラート表示の処理　ここの処理は引用いただいて構いません。
       * !!!!!!!!!!!!!!!!! */
      var str = '<div class="alert alert-danger" role="alert"><strong>認証エラー</strong> IDまたはPasswordが異なります。</div>';
      if($('.alert').length == 0){
        form.prepend(str);
      }
    }
  });
  
  
  //******************************************
  // ログインボタン押下時
  //******************************************
  $('.btn-password').on('touchstart',function(e){
    /* !!!!!!!!!!!!!!!!!
     * 以下テスト用の処理。開発時に削除してください
     * !!!!!!!!!!!!!!!!! */
    
    var id = "tfhd";
    var pw = "tfhd2016";
    var form = $('#loginForm');
    if(form.find('input[name=id]')[0].value == id && form.find('input[name=password]')[0].value == pw){
      form.submit();
    } else {
      /* !!!!!!!!!!!!!!!!!
       * アラート表示の処理　ここの処理は引用いただいて構いません。
       * !!!!!!!!!!!!!!!!! */
      var str = '<div class="alert alert-danger" role="alert"><strong>認証エラー</strong> IDまたはPasswordが異なります。</div>';
      if($('.alert').length == 0){
        form.prepend(str);
      }
    }
  });
});

