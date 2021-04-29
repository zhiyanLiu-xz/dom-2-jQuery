window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
  //接收选择器或者数组
  let elements;
  if (typeof selectorOrArrayOrTemplate === "string") {
    elements = document.querySelectorAll(selectorOrArrayOrTemplate);
    //jQuery 返回的是一个对象，可以操作elements的api
    //api 可以操作elements
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    elements = selectorOrArrayOrTemplate;
  }

  const api = Object.create(jQuery.prototype); //创建一个对象，这个对象的__proto__为括号里的东西
  // 等价于 const api ={__proto__:jQuery.prototype}
  //   api.elements = elements;
  //   api.oldApi = selectorOrArray.oldApi;
  Object.assign(api, {
    elements: elements,
    oldApi: selectorOrArrayOrTemplate.oldApi,
  }); //把中括号里面的属性，一个一个复制api中，浅复制
  return api;
};

jQuery.fn = jQuery.prototype = {
  //jQuery对它的prototype取了一个别名叫fn
  constructor: jQuery,
  jquery: true,
  get(index) {
    return this.elements[index]; //用this作为桥梁去访问elements
  },
  find(selector) {
    let array = [];
    for (let i = 0; i < this.elements.length; i++) {
      const elements2 = Array.from(this.elements[i].querySelectorAll(selector));
      array = array.concat(elements2); //elements中有多个test，要依次进入遍历
    }
    array.oldApi = this; //this 是 旧api
    const newApi = jQuery(array); //jQuery创建一个新的api
    return newApi;
    //不能直接return
  },

  each(fn) {
    for (let i = 0; i < this.elements.length; i++) {
      fn.call(null, this.elements[i]);
    }
    return this;
  },
  parent() {
    const array = [];
    this.each((node) => {
      //this就是api
      if (array.indexOf(node.parentNode) === -1) {
        array.push(node.parentNode); //没有父亲就push，有就不push了，因为有几个test，只打印出一个就行
      }
    });
    return jQuery(array); //返回可以操作数组的对象
  },
  print() {
    console.log(this.elements); //elements就是对应元素们
  },

  appendTo(node) {
    if (node instanceof Element) {
      this.each((el) => node.appendChild(el)); // 遍历 elements，对每个 el 进行 node.appendChild 操作
    } else if (node.jquery === true) {
      this.each((el) => node.get(0).appendChild(el)); // 遍历 elements，对每个 el 进行 node.get(0).appendChild(el))  操作
    }
  },
  append(children) {
    if (children instanceof Element) {
      this.get(0).appendChild(children);
    } else if (children instanceof HTMLCollection) {
      for (let i = 0; i < children.length; i++) {
        this.get(0).appendChild(children[i]);
      }
    } else if (children.jquery === true) {
      children.each((node) => this.get(0).appendChild(node));
    }
  },

  children() {
    const array = [];
    this.each((node) => {
      // 上课的时候这段代码是复制的，复制错了，现已改正
      array.push(...node.children);
      //等价于 array.push(node.children[0],node.children[1],node.children[2],....)把里面的元素弄平
    });
    return jQuery(array);
  },

  // addClass: function () {console.log(elements);},
  addClass(className) {
    //闭包：函数访问外部变量，这里addClass访问了elements
    //给一个className，会遍历整个elements
    for (let i = 0; i < this.elements.length; i++) {
      elements[i].classList.add(className); //每个element添加一个className
    }
    return this;
  },
  end() {
    return this.oldApi; //此时的this是 新的api
  },
};
