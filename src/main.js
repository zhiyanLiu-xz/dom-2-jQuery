// const api = jQuery(".test"); //jQuery不返回元素，返回api对象
// api.addClass("red"); //遍历所有刚才获取的元素，添加 .red

// const x1 = jQuery(".test").find(".child");
// console.log(x1);

const x = jQuery(".test");
const y = jQuery(".test").find(".child");

// x.each((div) => console.log(div)); //里面的div是形式参数，可以是x、y或者其他占位置用的

x.parent().print();
x.children().print();
