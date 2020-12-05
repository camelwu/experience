Route推荐使用children元素方式配置路由，但是除此之外还有另外三种配置方法。

1.compnent (属性或者方法)  
2.render(方法)  
3.children（方法）：children是只要配置了该属性，其里面返回的函数都会渲染，无论路径是否匹配。它能接受所有的路由属性，若不匹配match会为null

```
<Switch>
    <Route path="/about" component={() => <About />}></Route>
    {/**
        1.每次路由切换都触发路由对应的组件重新渲染，无论是component属性还是render属性
        2. 当用component属性，值为匿名函数时，父组件的每次重新render（无论有没有props传递给子组件）都会造成子组件重新render（每次render都会执行constructor）
        3.当用component属性时，值为react元素时，父组件的每次重新render都不会造成子组件每次都执行constructor
        4.当用render属性时，值为匿名函数时，父组件的每次重新render都不会造成子组件每次都执行constructor
        5.当用render属性时，值不可以为react元素，只能是函数
        */}

    {/* 方式1开始 */}
    {/* <Route exact path="/" component={(routeProps) => <MyHome {...routeProps} />}></Route>  */}
    {/* 这种方式会造成每次App组件重新render时候MyHome组件都会重新执行一次初始化生命周期，而不是执行update，，但是它能够传递入参作为MyHome的props,可以访问路由属性，但是需要在函数指定入参，然后标记传递到子组件  */}
    {/* 方式1结束 */}

    {/* 方式2开始 */}
    {/* <Route exact path="/" component={MyHome}></Route> */}
    {/*这种方式在App组件render方法再执行时，不会造成MyHome组件重新渲染，只是update,缺点：不能从父组件传递props到子组件，可以在子组件访问路由属性 */}
    {/* 方式2结束 */}

    {/* 方式3开始 */}
    {/* <Route exact path="/">
        <MyHome />
    </Route> */}
    {/* 这种方式每次（第一次除外）App执行render不会造成MyHome重新执行一次初始化生命周期，只会执行update的生命钩子，可以从父组件传递props到子组件，但是这个方式有一个缺点，子组件不能在props访问路由属性 */}
    {/* 方式3结束 */}

    {/* 方式4开始 */}
    <Route
        exact
        path="/"
        render={(routeProps) => <MyHome {...routeProps} />}
    ></Route>
    {/* 这种方式App的非第一次执行render方法，不会造成子组件重新执行constructor等生命周期初始化方法，只会执行update，可以传递props到子组件，可以在子组件取得路由props（只需在传递时指明） */}
    {/* 方式4结束 */}
</Switch>
```