$(function(){
  //******************************************
  // 基本情報の詳細ボタン押下時
  //******************************************
  $('.link__disp-detail--basic').on('touchstart',function(){
    var self = $(this)
    var idElem = $(this).parents('.card'); 
    idElem.find('.card__detail-wrapper').toggle(100,function(){
      if($(this).css('display') == 'block'){
        self.html('詳細情報を閉じる');
        idElem.find('.card__flow').css({"margin-top": "0px","border-radius": "10px"});
      }else{
        self.html('詳細情報を開く');
        idElem.find('.card__flow').css({"margin-top": "-10px","border-radius": "0 0 10px 10px"});
      }
    });
  });
  
  
  //******************************************
  // 詳細情報の詳細ボタン押下時
  //******************************************
  $('.link__disp-detail--option').on('touchstart',function(){
    var self = $(this)
    var targetElem = $(this).next(); 
    targetElem.toggle(100,function(){
      if($(this).css('display') == 'block'){
        self.html('詳細情報を閉じる');
      }else{
        self.html('詳細情報を開く');
      }
    });
  });
  
  
  //******************************************
  // モーダル処理
  //******************************************
  $('.btn__action').on('touchstart',function(e){
    //トリガーとなったボタンエレメント
    var trigger = $(this);
    //対象のcard
    var card = trigger.parents('.card');
    //ボタンの種類
    var triggerType = trigger.get(0).className.split(' ');
    var modalBox = $('#actionModal');
    console.log(trigger);
    console.log(card);
    console.log('triggerType: ' + triggerType);
    var modalObj;
    var triggerTypeFlg = false;
    
    for(var i = 0; i < triggerType.length; i++){
      switch(triggerType[i]) {
        case 'btn__improper':
          modalObj = createImproperModal(card);
          triggerTypeFlg = true;
          break;

        case 'btn__back':
          modalObj = createBackModal(card);
          triggerTypeFlg = true;
          break;

        case 'btn__approve':
          modalObj = createApproveModal(card);
          triggerTypeFlg = true;
          break;

        default:
          modalObj = {
            'label':'エラー',
            'body':'再度ボタンをクリックして下さい',
            'footer': ''
          }
          break;
      }
      if(triggerTypeFlg) break;
    }
    
    //モーダルにフォーム内容を出力
    $('#actionModalLabel').html(modalObj.label);
    modalBox.find('.modal-body').eq(0).html(modalObj.body);
    modalBox.find('.modal-footer').eq(0).html(modalObj.footer);
    
    
    $('#actionModal').modal('toggle');
  });
  $('#actionModal').on('shown.bs.modal', function(e){
    
    //送信ボタンタップ時の処理
    $('.btn-send').on('touchstart', function(e){
      $(this).off('touchstart');

      var form = $('#sendMessage');

      $.ajax({
        url: form.attr('action'),
        type: form.attr('method'),
        data: form.serialize(),
        complete: function(result){
          $('#actionModal').modal('hide');
          var targetCard = $('#' + form.find('input[name="cardId"]')[0].value)
          targetCard.addClass('card-finished');
          targetCard.find('.btn_ctrl a').removeAttr('data-toggle data-target');
          targetCard.find('.btn_ctrl circle').attr('class','fin_st0');
          targetCard.find('.btn-send').off('touchstart');
        },
        error: function(result){
          //！！！！！テスト用ダミー処理、開発時にエラー用表示の処理に変更お願いします！！！！！
          $('#actionModal').modal('hide');
          var targetCard = $('#' + form.find('input[name="cardId"]')[0].value)
          targetCard.addClass('card-finished');
          targetCard.find('.btn_ctrl a').removeAttr('data-toggle data-target');
          targetCard.find('.btn_ctrl circle').attr('class','fin_st0');
          targetCard.find('.btn-send').off('touchstart');

        }
      });
    });
    
    
  });
  
});


function createImproperModal(card){
  var obj = new Object();
  obj.label = "不可コメント";
  obj.body = '<form id="sendMessage" action="■■！！POST先を指定してください！！■■" method="post"><textarea class="form-control" id="message-text"></textarea><input type="hidden" name="cardId" value="' + card.attr('id') + '"><input type="hidden" name="submitType" value="improper"></form>';
  obj.footer = '<a data-dismiss="modal" class="pull-left">キャンセル</a><a class="btn-send"><svg id="btn_submit.svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="45" height="45" viewBox="0 0 163 163"><circle id="Ellipse_3_copy_3" data-name="Ellipse 3 copy 3" class="send_st0" cx="81" cy="79" r="75"/><text id="送信" class="st1 st2 st3" x="47.002" y="129.564">送信</text><path id="Shape_2_copy" data-name="Shape 2 copy" class="st1" d="M5901.01,3189.73l14.09-13.77,13.69,13.45,38.13-39.41,14.09,13.77-52.16,53.22Z" transform="translate(-5860 -3122)"/></svg></a>';
  
  return obj;
}

function createBackModal(card){
  var obj = new Object();
  obj.label = "差戻コメント";
  obj.body = '<form id="sendMessage" action="■■！！POST先を指定してください！！■■" method="post"><textarea class="form-control" id="message-text"></textarea><input type="hidden" name="cardId" value="' + card.attr('id') + '"><input type="hidden" name="submitType" value="back"></form>';
  obj.footer = '<a data-dismiss="modal" class="pull-left">キャンセル</a><a class="btn-send"><svg id="btn_submit.svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="45" height="45" viewBox="0 0 163 163"><circle id="Ellipse_3_copy_3" data-name="Ellipse 3 copy 3" class="send_st0" cx="81" cy="79" r="75"/><text id="送信" class="st1 st2 st3" x="47.002" y="129.564">送信</text><path id="Shape_2_copy" data-name="Shape 2 copy" class="st1" d="M5901.01,3189.73l14.09-13.77,13.69,13.45,38.13-39.41,14.09,13.77-52.16,53.22Z" transform="translate(-5860 -3122)"/></svg></a>';
  
  return obj;
}

function createApproveModal(card){
  var obj = new Object();
  obj.label = "承認";
  obj.body = '承認しました。<form id="sendMessage" action="■■POST先を指定してください■■" method="post"><input type="hidden" name="cardId" value="' + card.attr('id') + '"><input type="hidden" name="submitType" value="back"></form>';
  obj.footer = '<button type="button" class="btn btn-primary btn-close">閉じる</button>';

  //送信ボタンタップ時の処理
  $('#actionModal').on('hidden.bs.modal', function(e){
    $('#actionModal').off('hidden.bs.modal');

    var form = $('#sendMessage');

    $.ajax({
      url: form.attr('action'),
      type: form.attr('method'),
      data: form.serialize(),
      complete: function(result){
        $('#actionModal').modal('hide');
        var targetCard = $('#' + form.find('input[name="cardId"]')[0].value)
        targetCard.addClass('card-finished');
        targetCard.find('.btn_ctrl a').removeAttr('data-toggle data-target');
        targetCard.find('.btn_ctrl circle').attr('class','fin_st0');
        targetCard.find('.btn-send').off('touchstart');
      },
      error: function(result){
        //！！！！！テスト用ダミー処理、開発時にエラー用表示の処理に変更お願いします！！！！！
        $('#actionModal').modal('hide');
        var targetCard = $('#' + form.find('input[name="cardId"]')[0].value)
        targetCard.addClass('card-finished');
        targetCard.find('.btn_ctrl a').removeAttr('data-toggle data-target');
        targetCard.find('.btn_ctrl circle').attr('class','fin_st0');
        targetCard.find('.btn-send').off('touchstart');

      }
    });
  });
  
  return obj;
}