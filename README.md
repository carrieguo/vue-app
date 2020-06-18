## MVP 设计模式

> Model 数据层
> View 视图层，DOM 层
> Presenter 控制器，呈现层，业务逻辑控制层，View 层和 Model 层的中转站。关注的重点

## MVVM

> MVVM
> MVVM 又称状态机制，View 和 ViewModel 是进行绑定的，改变 ViewModel 就会直接作用到 View 视图上，而 View 会把事件传递给 ViewModel, ViewModel 去对 Model 进行操作并接受更新。
> View
> ViewModel vue 自身封装了 ViewModel 层。
> Model 关注的重点。

> jquery 面向 DOM 编程。 vue 面向数据编程。

## 前端组件化

```js
//全局组件
Vue.component('component1', {
    template: '<div>{{content}}</div>',
    data: function(){
        return {
            content: 'aaa';
        }
    }
});
//局部组件 使用时需要注册
var component2 = {
    template: '<div>{{content}}</div>',
    data: function(){
        return {
            content: 'aaa';
        }
    }
};
//全局组件
var app = new Vue({
    el: '#root',
    components: {component2}
});
```

## 组件间传值

```html
//父组件向子组件传值
<todo-item v-bind:content="item" v-for="item in list"> </todo-item>
<script>
  var TodoItem = {
    props: ["content"],
    template: "<li>{{content}}</li>",
  };
</script>

//子组件向父组件传值
<div id="root">
  <todo-item
    v-bind:content="item"
    v-bind:index="index"
    v-for="(item, index) in list"
    @delete="handleItemDelete"
  >
  </todo-item>
</div>
<script>
      var TodoItem = {
          props: ['content', 'index'],
          template: "<li @click='handleItemClick'>{{content}}</li>",
          methods: {
              handleItemClick: function(){
                  this.$emit('delete', this.index);
              }
          }
      }
      var app = new Vue({
      el: '#root',
      components: {TodoItem},
      data: {
          list: []
      }
      methods: {
          handleItemDelete: function(index){
              this.list.splice(index, 1);
          }
      }
  });
</script>
```

### 非父子组件间的传值

1. 借助 vuex
2. 使用发布订阅模式，总线（Bus）机制

```html
<div id="root">
  <child content="点a全换成a" />
  <child content="点b全换成b" />
</div>
<script>
  Vue.prototype.bus = new Vue();
  Vue.component('child', {
    props: {
      content: String
    },
    data: function() {
      return {
        selfContent: this.content
      }
    }.
    template: '<div @click="handleClick">{{content}}</div>',
    methods: {
      handleClick: function() {
        this.bus.$emit('change', this.selfContent);
      }
      mounted: funtion() {
        var _this = this;
        this.bus.$on('change', function(msg) {
          _this.selfContent = msg;
        })
      }
    }
  })
  var vm = new Vue({
    el: '#root'
  })
</script>
```

## vue 实例

> vue 根实例通过 new 修饰符创建。实际上，vue 中的每个组件也是一个 vue 实例.

```js
var vm = new Vue({});
Vue.component("item", {
  template: "<div>hello</div>",
});
```

> 通过控制台查看 vm 实例属性和方法，`$`开头的都是实例属性和方法

## vue 生命周期钩子

> 生命周期函数是指 vue 实例在某一个时间点会自动执行的函数
> beforeCreate
> created

## vue 的模板语法

> `{{}}` 插值表达式,里面可以写 js 表达式，不能解析 html 代码
> `v-text` 后面跟一个 js 表达式,不能解析 html 代码
> `v-html` 后面跟一个 js 表达式，可以解析 html 代码
> `v-`指令后面都跟一个 js 表达式，可以进行字符串拼接。例如 `v-html="name + ' Guo'"`

```html
<div>{{name + ' Guo'}}</div>
<div v-text="name + ' Guo'"></div>
<div v-html="name + ' Guo'"></div>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      name: "Dell",
    },
  });
</script>
```

## 计算属性，方法和侦听器

> 计算属性有缓存机制，计算属性依赖的变量未发生改变，就不会重新计算。
> watch 监听变量的改变，和 computed 相比有代码冗余。

## 计算属性的 setter 和 getter

```js
//处理用户输入时，根据setter改变fullName
var vm = new Vue({
        el: "#app",
        data: {
            firstName: "Dell",
            lastName: "Guo"
        },
        computed: {
            fullName: {
                get: funtion() {
                    return this.firstName + " " + this.lastName;
                },
                set: function(value) {
                    var arr = value.split(" ");
                    this.firstName = arr[0];
                    this.lastName = arr[1];
                }
            }
        }
    })
```

## vue 样式绑定

```html
<!-- class的对象绑定 -->
<!-- activated是一个类，通过isActivated变量true或者false来控制是否起作用 -->
<div :class="{activated: isActivated}"></div>
```

```html
<!-- 数组绑定  -->
<div :class="[activated, activatedOne]"></div>
<style>
  .red {
  }
  .red-one {
  }
</style>
<script>
  var vm = new Vue({
    el: "#app",
    data: {
      activated: "red",
      activatedOne: "red-one",
    },
  });
</script>
```

```html
<!-- 内联样式，下面两种写法 -->
<div :style="styleObj"></div>
<div :style="[styleObj, {fontSize: '20px'}]"></div>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            styleObj: {
                color: "red"
            }
        }
    })
```

## vue 条件渲染

```html
<!-- v-if 和 v-else 必须挨着用 -->
<div v-if="show">用户名： <input key="username" /></div>
<div v-else>密码： <input key="password" /></div>
<div v-show="show"></div>
<div v-show="show === 'a'"></div>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            show: false，
            display: 'a'
        }
    })
```

> vue 虚拟 DOM 中 diff 算法：在重新渲染页面时,会尽量尝试复用页面上已经存在的 DOM, 如果不想在渲染时复用，可以给`input`加 key 值。

## vue 列表渲染

### 数组渲染

```html
<div v-for="(item, index) of list" :key="item.id">
  {{item.text}} --- {{index}}
</div>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            list: [{
              id: "2032",
              text: "hello"
            },{
              id: "2031",
              text: "world"
            }
            ]
        }
    })
```

> 为了提升循环显示的性能，会给每一个循环项加一个唯一的 key 值,key 值不建议使用 index 下标，建议使用 id，作为唯一标识.
> 修改数组时，不能使用数组下标的方式修改数组，页面不会有响应式的变化；只能通过 vue 提供的数组变异方法来修改数组，页面会有响应式的变化。
> `pop`, `push`, `shift`, `unshift`, `splice`, `sort`, `reverse`

```js
// 从下标1开始，删除一条，将其替换为id为333的记录
vm.list.splice(1, 1, { id: "333", text: "abc" });
```

> 改变数组引用也能发生响应式的变化

```js
vm.list = [
  {
    id: "3232",
    text: "new list",
  },
];
```

> `template` 模板占位符，不会被真正渲染到页面上

```html
<template v-for="(item, index) of list" :key="item.id">
  <div>
    {{item.text}} --- {{index}}
  </div>
  <span>{{item.text}}</span>
  <template></template
></template>
```

### 对象渲染

```html
<div v-for="(item, key, index) of userInfo" :key="item.id">
  {{item}} --- {{key}} --- {{index}}
</div>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            userInfo: {
              name: "carrie guo",
              age: 19
            }
        }
    })
```

> 修改对象时，通过改引用，页面可以有响应式的变化。

## vue 中的 Set 方法

> 修改对象时，除了通过改引用，也可以通过 set 方法，使页面有响应式的变化。

```js
Vue.set(vm.userInfo, "address", "beijing");
```

> set 方法既是全局方法，又是实例方法,实例的\$set 和全局的 set 方法是一样的。

```js
vm.$set(vm.userInfo, "address", "beijing");
```

### 数组的 set 方法

```js
// 将数组的第一项值改为5
Vue.set(vm.userInfo, 1, 5);
vm.$set(vm.userInfo, 1, 5);
```

## 深入理解 Vue 组件

### is ref

> 使用`is`解决 h5 标签上的 bug, 例如 ul 嵌套子组件 li,select 嵌套子组件,table 嵌套 tr<option>

```js
//html dom
<tbody>
  <tr is="item"></tr>
</tbody>;
//js 组件
Vue.component("item", {
  template: "<tr><td> {{content}}</td></tr>",
  data: function () {
    return {
      content: "是个傻妞",
    };
  },
});
```

> 全局 new Vue 中定义 data 可以是对象，因为只渲染一次，不复用。子组件中定义`data` 必须是函数，因为会复用，函数作用域数据不会相互影响。
> `ref`定义在 html 上获取原生 dom 节点。定义在子组件上，获取子组件的 vue 实例。

```html
<!-- ref定义在子组件上，获取子组件的 vue 实例-->
<div id="app">
  <div ref="hello" @click="handleClick"></div>
  <counter ref="one" @change="handleChange"></counter>
  <counter ref="two" @change="handleChange"></counter>
  <div>{{total}}</div>
</div>
<script>
  //js 组件
  Vue.component("counter", {
    template: '<div @click="handleClick">{{number}}</div>',
    data: function () {
      return {
        number: 0,
      };
    },
    methods: {
      handleClick: function () {
        this.number++;
        this.$emit("change");
      },
    },
  });

  var vm = new Vue({
    el: "#app",
    data: {
      total: 0,
    },
    method: {
      handleChange: function () {
        this.total = this.$refs.one.number + this.$refs.two.number;
      },
    },
  });
</script>
```

> 向子组件中绑定传值时`:a=""` 引号里是一个 js 表达式；`a=""`引号里是一个字符串。

### 单向数据流

> 不允许子组件修改父组件传过来的值。原因：假如子组件接收改变的值是引用类型，可能其他组件也在使用这个值，这样会影响到其他组件。子组件可以在其 data 中新建一个变量，改变这个变量，而不影响父组件传过来的值。

### 组件参数校验与非 props 特性

```html
<div id="root">
  <child content="hello"></child>
</div>
<script>
  Vue.component("child", {
    props: {
      // 子組件接收的值需为String类型
      // content: String
      // content: [Number, String]
      content: {
        type: String,
        required: false,
        default: "default value",
        validator: function (value) {
          return value.length > 5;
        },
      },
    },
    template: "<div>Child {{content}}</div>",
  });
  var vm = new Vue({
    el: "#root",
  });
</script>
```

> 非 props 特性指的是父组件定义特性，子组件不接收，非 props 数值会展示在 dom 标签上。

### 给组件绑定原生事件

```html
<!-- click是自定义事件 -->
<child @click="handleClick"></child>

<!-- click是原生事件 -->
<child @click.native="handleClick"></child>
```

### 插槽

```html
<!-- 不使用插槽 -->
<div id="root">
  <child content="<p>hello</p>"></child>
</div>
<script>
  Vue.component("child", {
    props: ["content"],
    template: "<div v-html="this.content"></div>",
  });
  var vm = new Vue({
    el: "#root",
  });
</script>
```

```html
<!-- 使用插槽 -->
<div id="root">
  <child>
    <p>Hello</p>
  </child>
</div>
<script>
  Vue.component("child", {
    template: "<div><slot>默认内容</slot></div>",
  });
  var vm = new Vue({
    el: "#root",
  });
</script>
```

> 当子组件有一部分内容是根据父组件传递过来的 DOM 进行显示时，我们可以使用插槽

```html
<!-- 具名插槽 -->
<div id="root">
  <child content="<p>hello</p>">
    <div class="header" slot="header">header</div>
    <div class="footer" slot="footer">footer</div>
  </child>
</div>
<script>
  Vue.component("child", {
    props: ["content"],
    template: `<div>
                <slot name="header">默认内容</slot>
                <slot name="footer">默认内容</slot>
              </div>`,
  });
  var vm = new Vue({
    el: "#root",
  });
</script>
```

```html
<!-- 作用域插槽 -->
<div id="root">
  <child>
    <template slot-scope="childProps">
      <li class="different-style">{{childProps.item}}</li>
    </template>
  </child>
</div>
<script>
  Vue.component("child", {
    data: function () {
      return {
        list: [1, 2, 3, 4],
      };
    },
    template: `<div>
                <ul>
                  <slot v-for="item of list"
                    :item=item></slot>
                </ul>
              </div>`,
  });
  var vm = new Vue({
    el: "#root",
  });
</script>
```

> 作用域插槽 子组件复用，复用样式不同，用作用域插槽。

### 动态组件

```html
<!-- 当 `currentView` 改变时，组件也跟着改变 -->
<component v-bind:is="currentView"></component>
```

### v-once

> 渲染普通的 HTML 元素在 Vue 中是非常快速的，但有的时候你可能有一个组件，这个组件包含了大量静态内容。在这种情况下，你可以在根元素上添加 v-once attribute 以确保这些内容只计算一次然后缓存起来

## Vue 中 CSS 动画原理

> 当一个元素包裹在`<transition>`标签内时，vue 会分析 css 样式，然后构建动画流程。元素从未显示到显示状态过程中，动画即将执行时，会向内部 div 增加两个 class，分别为`v-enter`和`v-enter-active`；当动画第一帧结束后，在动画第二帧时会移除`v-enter`,添加`v-enter-to`；执行到动画结束后，会移除`v-enter-active`和`v-enter-to`。

```html
<style>
/* v-是缺省name的默认名字，可以设置name */
.fade-enter{}
</style>
<transition>
  <div name="fade"></div>
</transttion>
```

[transition 原理](https://segmentfault.com/a/1190000015602918)

## Vue 动画中使用 Animate.css 库

```css
/* 未引用Animate.css库时要自己写css样式 */
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
```

```html
<!-- 使用Animate.css库，封装了 @keyframes -->
<link
  href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1"
  rel="stylesheet"
  type="text/css"
/>
<!-- 我们可以通过以下 attribute 来自定义过渡类名： -->
<transition
  name="custom-classes-transition"
  enter-active-class="animated tada"
  leave-active-class="animated bounceOutRight"
></transition>
```

## 在 vue 中同时使用过渡和动画

```html
<link
  href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1"
  rel="stylesheet"
  type="text/css"
/>
<!-- 可以通过 appear attribute 设置节点在初始渲染的过渡 -->
<transition
  appear
  name="custom-classes-transition"
  enter-active-class="animated tada"
  leave-active-class="animated bounceOutRight"
  appear-active-class="animated tada"
></transition>
```

### 动画时长以 transtion 或 @keyframe 为准

> 在一些场景中，你需要给同一个元素同时设置两种过渡动效，比如 animation 很快的被触发并完成了，而 transition 效果还没结束。在这种情况中，你就需要使用 type attribute 并设置 animation 或 transition 来明确声明你需要 Vue 监听的类型。

### 自定义动画播放时长

> 你可以用 <transition> 组件上的 duration prop 定制一个显性的过渡持续时间 (以毫秒计)：

```html
<transition :duration="1000">...</transition>
```

> 你也可以定制进入和移出的持续时间：

```html
<transition :duration="{ enter: 500, leave: 800 }">...</transition>
```

## Vue 中的 JS 动画与 Velocity.js 的结合

```html
<!--
Velocity 和 jQuery.animate 的工作方式类似，也是用来实现 JavaScript 动画的一个很棒的选择
-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>

<div id="example-4">
  <button @click="show = !show">
    Toggle
  </button>
  <transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave"
    v-bind:css="false"
  >
    <p v-if="show">
      Demo
    </p>
  </transition>
</div>
<script>
  new Vue({
    el: "#example-4",
    data: {
      show: false,
    },
    methods: {
      beforeEnter: function (el) {
        el.style.opacity = 0;
        el.style.transformOrigin = "left";
      },
      enter: function (el, done) {
        Velocity(el, { opacity: 1, fontSize: "1.4em" }, { duration: 300 });
        Velocity(el, { fontSize: "1em" }, { complete: done });
      },
      leave: function (el, done) {
        Velocity(
          el,
          { translateX: "15px", rotateZ: "50deg" },
          { duration: 600 }
        );
        Velocity(el, { rotateZ: "100deg" }, { loop: 2 });
        Velocity(
          el,
          {
            rotateZ: "45deg",
            translateY: "30px",
            translateX: "30px",
            opacity: 0,
          },
          { complete: done }
        );
      },
    },
  });
</script>
```

## vue 中多个元素或组件的过渡

### 多个元素的过渡

```html
<style>
  .v-enter,
  .v-leave-to {
    opacity: 0;
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 1s;
  }
</style>
<div id="root">
  <!-- 因为vue在动画中会尽量的复用DOM，为了避免这种复用问题所以要在多元素过渡时要标注不同的key。-->
  <!-- 过渡模式mode -->
  <transtion mode="out-in">
    <div v-if="show" key="hello">Hello</div>
    <div v-else key="bye">Bye</div>
  </transtion>
  <button @click="handleClick">toggle</button>
</div>
<script>
  var vm = new Vue({
    el: "#root",
    data: {
      show: false,
    },
    methods: {
      handleClick: function () {
        this.show = !this.show;
      },
    },
  });
</script>
```

### 多个组件的过渡

```html
<style>
  .v-enter,
  .v-leave-to {
    opacity: 0;
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 1s;
  }
</style>
<div id="root">
  <!-- 因为vue在动画中会尽量的复用DOM，为了避免这种复用问题所以要在多元素过渡时要标注不同的key。-->
  <!-- 过渡模式mode -->
  <transtion mode="out-in">
    <component :is="type"></component>
  </transtion>
  <button @click="handleClick">toggle</button>
</div>
<script>
  Vue.component("child", {
    template: "<div>child</div>",
  });
  Vue.component("child-one", {
    template: "<div>child-one</div>",
  });
  var vm = new Vue({
    el: "#root",
    data: {
      type: 'child',
    },
    methods: {
      handleClick: function() {
        this.type = this.type ==== 'child' ? 'child-one' : 'child';
      }
    }
  });
</script>
```

## vue 中的列表过渡

> div 的列表循环之后会变成多个 div，外层加上<transition-group>,相当于对列表中的每一项都加上了<transition>

```html
<style>
  .v-enter,
  .v-leave-to {
    opacity: 0;
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 1s;
  }
</style>
<div id="root">
  <transition-group>
    <div v-for="(item, index) of list" :key="item.id">
      {{item.title}}
    </div>
  <transition-group>
  <button @click="handleBtnClick">Add</button>
</div>
<script>
  var vm = new Vue({
    el: "#root",
    data: {
      list: [],
    },
    methods: {
      handleBtnClick: function () {
        this.list.push({
          id: count++,
          title: "hello",
        });
      },
    },
  });
</script>
```

## Vue 中的动画封装

```html
<div id="root">
  <fade :show="show">
    <div>hello</div>
  </fade>
  <fade :show="show">
    <div>world</div>
  </fade>
  <button @click="handleClick">toggle</button>
</div>
<script>
  Vue.component("fade", {
    props: ["show"],
    template: `<transtion @before-enter="handleBeforeEnter"
                @enter="handleEnter">
                <slot v-if="show"></slot>
              </transtion>`,
    methods: {
      handleBeforeEnter: function (el) {
        el.style.color = "red";
      },
      handleEnter: function (el, done) {
        el.style.color = "green";
        done();
      },
    },
  });
  var vm = new Vue({
    el: "#root",
    data: {
      show: false,
    },
    methods: {
      handleClick: function () {
        this.show = !this.show;
      },
    },
  });
</script>
```

## 项目介绍

适应
