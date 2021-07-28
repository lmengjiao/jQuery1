$(function(){
    console.log('js的外部引入')

    })
    //给 加入购物车添加一个点击事件
    function add_shoppingcart(dom){
        //获取行
        var trDom=$(dom).parent().parent();
        //拿到td
        var name=trDom.children().eq(0).text();
        var price=trDom.children().eq(1).text();
        
             //把trDOm放入下面的表格
        //按需要添加 编辑一个dom元素
       var addtr= $(" <tr>"
       +" <td>"+name+"</td>"
       +" <td>"+price+"</td>"
       +" <td align='center'>"
       +" <input type='button' value='-' onclick='jian(this)'/>"
       +" <input type='text' size='3' readonly value='1'/>"
       +" <input type='button' value='+' onclick='jia(this)'/>"
       +" </td>"
       +" <td>"+price+"</td>"
       +"<td align='center'><input type='button' value='x' onclick='deletShopping(this)'/></td>"
       +" </tr>')"
     );
        //遍历购物车
        var goodsTrDom=$('#goods tr')
        //创建一个数组 用来接收产品的名称
        var nameArr=new Array();
        //遍历数组
        $.each(goodsTrDom, function(index, value) {
            console.log()
            //把名字放在数组
            nameArr.push($(this).children('td').eq(0).text())
        })
        console.log(nameArr)
        //判断数组是否有name
        var isName=nameArr.indexOf(name);
        console.log(isName)
        //使商品只能出现一行
        if(isName>=0){
            //计数
            var goodsCount=goodsTrDom.eq(isName).children('td').eq(2).children().eq(1).val()
            var num=Number.parseInt(goodsCount)+1;
            goodsTrDom.eq(isName).children('td').eq(2).children().eq(1).val(num);
        }else{
            $('#goods').append(addtr);
        }


         //传递过来的btn是dom元素，先全部转为jQuery元素,多次用到tds
     var tds = $(dom).parent().siblings();
     //获取到商品库存信息，string类型
    var stock=tds.eq(3).html();

    //先查看库存是否为0，为0不允许点击事件的发生
    if(stock <= 0){
       return;
   }

   //当点击了放入购物车后，库存减掉1
   tds.eq(3).html(--stock);
   sum()
      }

      function jian(btn){
         //获取按钮的哥哥的值(数量)
    		 var amount = $(btn).next().val();
    		 //数量-1，再写回文本框
         if(amount>=2){
    		 $(btn).next().val(--amount);
       //获取按钮的父亲的哥哥的内容(单价)
       var price = $(btn).parent().prev().html();
       //计算金额，再写入按钮的父亲的弟弟(td3)内
       $(btn).parent().next().html(amount*price);
         }
         sum()
      }

      function jia(btn){
         //获取按钮的哥哥的值(数量)
    		 var amount = $(btn).prev().val();
    		 //数量+1，再写回文本框
    		 $(btn).prev().val(++amount);
         //获取按钮的父亲的哥哥的内容(单价)
        var price = $(btn).parent().prev().html();
        //计算金额，再写入按钮的父亲的弟弟(td3)内
        $(btn).parent().next().html(amount*price);
      }

      function deletShopping(btn){//给上一步你拼接的删除按钮上绑定一个这样的方法
        $(btn).parent().parent().remove();
        sum()
        }

     //求和
     function sum() {
      var $trs = $("#goods tr");
      var s = 0;
      for (var i = 0; i < $trs.length; i++) {
          var mny =
              $trs.eq(i).children().eq(3).html();
          s += parseFloat(mny);
      }
      //将结果写入合计列
      $("#total").html(s);
  }
  function rem(tu) {
      var i = $(tu).parent().siblings()
      i.parent().remove()
      sum();
  }


    