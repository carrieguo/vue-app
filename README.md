## MVP 设计模式
> Model 数据层
> View 视图层，DOM层
> Presenter 控制器，呈现层，业务逻辑控制层，View层和Model层的中转站。关注的重点

## MVVM
> MVVM
MVVM 又称状态机制，View和ViewModel 是进行绑定的，改变ViewModel 就会直接作用到View视图上，而View 会把事件传递给ViewModel, ViewModel去对Model进行操作并接受更新。
> View
> ViewModel vue自身封装了ViewModel层。
> Model 关注的重点。

>jquery面向DOM编程。 vue面向数据编程。

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
<todo-item  v-bind:content="item"
            v-for="item in list">
</todo-item>
<script>
    var TodoItem = {
        props: ['content'],
        template: "<li>{{content}}</li>"
    }
</script>

//子组件向父组件传值
<div id="root">
    <todo-item  v-bind:content="item"
                v-bind:index="index"
                v-for="(item, index) in list"
                @delete="handleItemDelete">
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
> vue根实例通过new修饰符创建。实际上，vue中的每个组件也是一个vue实例.
```js
var vm = new Vue({});
Vue.component('item', {
    template: '<div>hello</div>'
    })
```
> 通过控制台查看vm实例属性和方法，`$`开头的都是实例属性和方法

## vue生命周期钩子
> 生命周期函数是指vue实例在某一个时间点会自动执行的函数
beforeCreate
created

## 深入理解Vue组件
> 使用`is`解决h5标签上的bug, 例如ul嵌套子组件li,select嵌套子组件<option>
```js
//html dom
<tr><td is="item"></td></tr>
//js 组件
Vue.component('item',{
            template:'<td> {{content}}</td>',
            data:function(){
                return {
                    content:"是个傻妞"
                }
            }
        })
```

> 全局new Vue中定义data可以是对象，因为只渲染一次，不复用。子组件中定义`data` 必须是函数，因为会复用，函数作用域数据不会相互影响。
> `ref`定义在html上获取原生dom节点。定义在子组件上，获取子组件的vue实例。
> 向子组件中绑定传值时`:a=""` 引号里是一个js表达式；`a=""`引号里是一个字符串。

### 单向数据流
> 不允许子组件修改父组件传过来的值。原因：假如子组件接收改变的值是引用类型，可能其他组件也在使用这个值，这样会影响到其他组件。子组件可以在其data中新建一个变量，改变这个变量，而不影响父组件传过来的值。

### 动态组件

```html
<!-- 当 `currentView` 改变时，组件也跟着改变 -->
<component v-bind:is="currentView"></component>
```

### v-once

> 渲染普通的 HTML 元素在 Vue 中是非常快速的，但有的时候你可能有一个组件，这个组件包含了大量静态内容。在这种情况下，你可以在根元素上添加 v-once attribute 以确保这些内容只计算一次然后缓存起来

## 项目介绍
适应