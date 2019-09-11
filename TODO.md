TODO： vue中使用refs定位dom出现undefined的解决方法
原来，mounted阶段，DOM结构准备就绪，但是这里的准备就绪需要特别说明一下：

DOM结构已经出来了，但是如果在DOM结构中的某个DOM节点使用了v-if、v-show或者v-for（即根据获得的后台数据来动态操作DOM，即响应式），那么这些DOM是不会再mounted阶段找到的。

此时的mounted阶段，一般是用于发起后端请求，拿回数据，配合路由钩子做一些事情，简单来说就是在mounted钩子中加载数据而已，加载回来的数据是不会再这个阶段更新的DOM中的

所以如果在mounted钩子中使用$refs，如果ref是定位在有v-if、v-for、v-show中的DOM节点，返回来的只能是undefined，因为在mounted阶段他们根本不存在！！

经过检验，上面端文字是错误的，$refs定位不到的主要原因是因为v-if、v-for、v-show这些语句如果依赖父组件传来的参数的话，该该参数是在mounted()阶段子还没获取得到~~~~！！！！

如果想要真正地在DOM加载完成后拿到数据，就需要调用VUE的全局api ： this.$nextTick(() => {})

如果说mounted阶段是加载阶段，那么updated阶段则是完成了数据更新到DOM的阶段(对加载回来的数据进行处理)，此时，ref、数据等等全部都挂载到DOM结构上去，在update阶段使用this.$refs.xxx，就100%能找到该DOM节点。

updated与mounted不同的是，在每一次的DOM结构更新，vue都会调用一次updated(){}钩子函数！而mounted仅仅只执行一次而已

简单来说，只要在调试的时候，能看到元素的存在，在updated阶段都可以使用this.$refs.xxx找到对应的DOM节点！