$(function(){
  //******************************************
  // 基本情報の詳細ボタン押下時
  //******************************************
  $('.link__disp-detail--basic').on('click',function(){
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
  $('.link__disp-detail--option').on('click',function(){
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
});