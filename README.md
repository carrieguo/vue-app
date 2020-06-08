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
<div :style="[styleObj, {fontSize: '20px'}]">
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

## 深入理解 Vue 组件

> 使用`is`解决 h5 标签上的 bug, 例如 ul 嵌套子组件 li,select 嵌套子组件<option>

```js
//html dom
<tr>
  <td is="item"></td>
</tr>;
//js 组件
Vue.component("item", {
  template: "<td> {{content}}</td>",
  data: function () {
    return {
      content: "是个傻妞",
    };
  },
});
```

> 全局 new Vue 中定义 data 可以是对象，因为只渲染一次，不复用。子组件中定义`data` 必须是函数，因为会复用，函数作用域数据不会相互影响。
> `ref`定义在 html 上获取原生 dom 节点。定义在子组件上，获取子组件的 vue 实例。
> 向子组件中绑定传值时`:a=""` 引号里是一个 js 表达式；`a=""`引号里是一个字符串。

### 单向数据流

> 不允许子组件修改父组件传过来的值。原因：假如子组件接收改变的值是引用类型，可能其他组件也在使用这个值，这样会影响到其他组件。子组件可以在其 data 中新建一个变量，改变这个变量，而不影响父组件传过来的值。

### 动态组件

```html
<!-- 当 `currentView` 改变时，组件也跟着改变 -->
<component v-bind:is="currentView"></component>
```

### v-once

> 渲染普通的 HTML 元素在 Vue 中是非常快速的，但有的时候你可能有一个组件，这个组件包含了大量静态内容。在这种情况下，你可以在根元素上添加 v-once attribute 以确保这些内容只计算一次然后缓存起来

## 项目介绍

适应
