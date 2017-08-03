# Rongcapital UI

[![Build Status](https://travis-ci.org/WellerQu/rongcapital-ui.svg?branch=master)](https://travis-ci.org/WellerQu/rongcapital-ui)
[![bitHound Overall Score](https://www.bithound.io/github/WellerQu/rongcapital-ui/badges/score.svg)](https://www.bithound.io/github/WellerQu/rongcapital-ui)
[![bitHound Dependencies](https://www.bithound.io/github/WellerQu/rongcapital-ui/badges/dependencies.svg)](https://www.bithound.io/github/WellerQu/rongcapital-ui/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/WellerQu/rongcapital-ui/badges/devDependencies.svg)](https://www.bithound.io/github/WellerQu/rongcapital-ui/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/WellerQu/rongcapital-ui/badges/code.svg)](https://www.bithound.io/github/WellerQu/rongcapital-ui)


```
                                                    __----~~~~~~~~~~~------___
                                   .  .   ~~//====......          __--~ ~~
                   -.            \_|//     |||\\  ~~~~~~::::... /~
                ___-==_       _-~o~  \/    |||  \\            _/~~-
        __---~~~.==~||\=_    -_--~/_-~|-   |\\   \\        _/~
    _-~~     .=~    |  \\-_    '-~7  /-   /  ||    \      /
  .~       .~       |   \\ -_    /  /-   /   ||      \   /
 /  ____  /         |     \\ ~-_/  /|- _/   .||       \ /
 |~~    ~~|--~~~~--_ \     ~==-/   | \~--===~~        .\
          '         ~-|      /|    |-~\~~       __--~~
                      |-~~-_/ |    |   ~\_   _-~            /\
                           /  \     \__   \/~                \__
                       _--~ _/ | .-~~____--~-/                  ~~==.
                      ((->/~   '.|||' -_|    ~~-/ ,              . _||
                                 -_     ~\      ~~---l__i__i__i--~~_/
                                 _-~-__   ~)  \--______________--~~
                               //.-~~~-~_--~- |-------~~~~~~~~
                                      //.-~~~--\
```

组件系统按行为分为视觉组件和视图组件. 视觉组件有可见外观, 尺寸, 前景色, 背景色等属性; 视图组件无视觉效果, 仅决定从属组件的布局方式. 采用属性继承的方式, 将数据仅向下传递. 本组件系统与业务无关, 但**仅为Cube服务**.

## 构建开发版本
`npm run release:dev` 生成开发版本

## 构建生产版本
`npm run release` 生成生产版本

## 启动开发服务
`npm run dev` 开始开发

## 工具

- [Enzyme](http://airbnb.io/enzyme/docs/api/index.html)
- [stroybook](https://storybook.js.org/)

## 其他重要依赖

- [react-custom-scrollbars](https://github.com/malte-wessel/react-custom-scrollbars)
- [core-decorators](https://github.com/jayphelps/core-decorators.js)
- [react-dnd](https://github.com/react-dnd/react-dnd)

## Core components

**核心视图**组件, 无视觉效果, 但决定从属组件布局. 非常重要, 决定了后续其他 Base Components 的实现. 大约需要 **30** 人/日. 

- **View**
    基础视图组件

    | 属性名 | 类型 | 备注 |
    | --- | --- | --- |
    | height | number | 高度 |
    | width | number | 宽度 |
    | children | element | 从属元素 |
    | inline | boolean | 默认false, 使用内联布局 |

    ```javascript
    const component = () => 
        <View />;
    ```

    ```javascript
    const component = () => 
        <View width={ 100 } height={ 100 } />;
    ```

    ```javascript
    const component = () => 
        <View width={ 100 } height={ 100 }>
            <div>Hello World</div>
        </View>;
    ```
    
- **CollectionView**
    单纯的无布局的容器组件, ListView, GridView均是具体实现, 继承自View视图组件

    | 属性名 | 类型 | 备注 |
    | --- | --- | --- |
    | itemLayout | func(item, index) | 在渲染前可以重新制定子元素渲染方案 |

    ```javascript
    const itemLayout = (item, index) => ( 
        React.cloneElement(item, {
            ...item.props,
            style: {
                position: 'absolute',
                right: 50 * index,
                width: 50,
                height: 50,
            }
        }));

    const component = () =>
        <CollectionView width={ 500 } height={ 300 } itemLayout={ itemLayout }>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
        </CollectionView>;
    ```
    
- **GridView**
    CollectionView的一种具体实现, 网格布局视图组件, 继承自CollectionView视图组件

    | 属性名 | 类型 | 备注 |
    | --- | --- | --- |
    | rows | number | 必填, 行数 |
    | columns | number | 必填, 列数 |
    | cellLayout | func(config) | 设置网格布局, 比如合并单元格 |

    ```javascript
    const cellLayout = () => {
        cells[0].rowspan = 2;
        cells[0].colspan = 2;
        cells[1].isMounted = false; // 单元格已被合并, 所以不再挂载
        cells[3].isMounted = false;
        cells[4].isMounted = false;

        return cells;
    };

    const component = () =>
        <GridView width={ 300 } height={ 300 } rows={ 4 } columns={ 3 } cellLayout={ cellLayout }>
            <div>item 0</div>
            <div>item 1</div>
            <div>item 2</div>
            <div>item 3</div>
            <div>item 4</div>
            <div>item 5</div>
            <div>item 6</div>
            <div>item 7</div>
            <div>item 8</div>
            <div>item 9</div>
            <div>item 10</div>
            <div>item 11</div>
            <div>item 12</div>
        </GridView>
    ```

- **ListView**
    CollectionView的一种具体实现, 有水平排列或垂直排列效果的视图组件, 继承自CollectionView视图组件

    | 属性名 | 类型 | 备注 |
    | --- | --- | --- |
    | mode | number | 默认垂直排列 |

    ```javascript
    const component = () =>
        <ListView>
            <div>item 0</div>
            <div>item 1</div>
            <div>item 2</div>
            <div>item 3</div>
            <div>item 4</div>
            <div>item 5</div>
        </ListView>
    ```

    ```javascript
    const MODE = ListView.MODE;
    const component = () =>
        <ListView mode={ MODE.HORIZONTAL } inline>
            <div>item 0</div>
            <div>item 1</div>
            <div>item 2</div>
            <div>item 3</div>
            <div>item 4</div>
            <div>item 5</div>
        </ListView>
    ```

- **NavigationView**
    有stack结构的视图组件, 继承自View视图组件

    | 属性名 | 类型 | 备注 |
    | --- | --- | --- |
    | index | number | 当前显示从属元素索引, Zero-base |
    | beforeNext | func | 显示下一个元素之前 |
    | afterNext | func | 显示下一个元素之后 |
    | beforePrev | func | 显示上一个元素之前 |
    | afterPrev | func | 显示上一个元素之后 |

    ```javascript
    const ItemView = ({ children, next, prev }) => (
        <div>
            <p>{ children }</p>
            <div>
                <button onClick={ compose(prev, action('prev')) }>Prev</button>
                <button onClick={ compose(next, action('next')) }>Next</button>
            </div>
        </div>
    );

    const component = () =>
        <NavigationView width={ 200 } height={ 100 } index={ 2 }>
            <ItemView>item 0</ItemView>
            <ItemView>item 1</ItemView>
            <ItemView>item 2</ItemView>
        </NavigationView>
    ```
    
- **ScrollView**
    有滚动效果的视图组件, 继承自View视图组件

    | 属性性 | 类型 | 备注 |
    | --- | --- | --- |
    | width | number | 必选, 宽度 |
    | height | number | 必选, 高度 |

    ```javascript
    const component = () =>
        <ScrollView width={ 500 } height={ 300 }>
            <div style={ temp }>items 1</div>
            <div style={ temp }>items 2</div>
            <div style={ temp }>items 3</div>
            <div style={ temp }>items 4</div>
            <div style={ temp }>items 5</div>
        </ScrollView>
    ```
        
## Base components

**基础视觉**组件, 仅有外观, 无关布局的组件. 次等重要, 决定复杂 Business Components 的实现. 大约 **60** 人/日.

- **Breadcrumbs**
    面包屑视觉组件, 继承自ListView视图组件的高阶组件

- **ActionBar**
    应用标题视觉组件, 继承自ListView视图组件的高阶组件
    
    - **ActionBar.Item**
        ActionBar中的视图组件
        
- **SnakeBar**  
    窗口底部显示消息的视觉组件
    * 有 **左下角, 底部居中, 右下角** 三种定位选择;

- **Menu**
    菜单视图组件. 继承自ListView视图组件
    
    - **Menu.Item**
        菜单项视觉组件, 集成自View视图组件

- **Loading**
    视觉组件, 显示加载中, 继承自View视图组件

- **LOGO**
    LOGO视觉组件, 继承自View视图组件

- **ICONS**
    各种ICON视觉组件, 继承自View视图组件. 计划采用阿里的开源[矢量图标集](http://www.iconfont.cn/) 
    * 有 **正常(默认), 禁用** 二种状态;
    * 有 **大, 中(默认), 小** 三种尺寸;
    * 有 **文案前置, 文案后置(默认), 不显示文案** 三种选择;

- **Image**
    图片视觉组件, 继承自View视图组件
    * 有 **顶部文案, 底部文案(默认), 不显示文案** 三种选择;
    * 有 **文案居左(默认), 文案居中, 文案居右** 三种选择;
    * 有 **水平填满, 垂直填满, 全部填满, 原图大小(默认)** 四种选择;

- **Label**
    标签视觉组件, 继承自View视图组件

- **Text**
    文案视觉组件, 继承自View视图组件
    * 有 **1 - 6** 个级别字体大小

- **Panel**
    面板容器视觉组件, 继承自View视图组件
    
    - **Panel.Header**
    - **Panel.Footer**
    - **Panel.Body**

- **Card**
    卡片容器视觉组件, 继承自Panel视觉组件

- **SidePanel**
    定位在窗体四周的边栏面板视觉组件, 继承自Panel视觉组件
    
- **Button** ( Large | Normal | Small | Primary | Second | Default | Disabled )
    按钮视觉组件, 继承自View视图组件
    * 有 **正常, 点击, 悬停, 禁用** 四种样式;
    * 有 **矩形, 圆形** 二种样式;
    * 有 **主要, 次要, 默认** 三种样式;
    
- **ButtonGroup** 
    按钮组视图组件, 用于管理按钮视觉组件. 继承自ListView视图组件.
    
    - **ButtonGroup.Separator**
        按钮组分隔符视觉组件, 继承自View视图组件.

- **Form**
    表单视图组件, 没有继承自任何组件的高阶组件, 依据表现形式组装从属组件.
    * 有 **水平, 垂直, 网格** 三种表现形式;
    * 发起从属组件内容验证
    
- **InputText**
    文本框视觉组件, 继承自View视图组件
    * 被动触发内容验证;
    * 有Placeholder;
    
- **Checkbox**
    复选框视觉组件
    * 被动触发内容验证;
    
- **CheckboxGroup**
    管理复选框的复选框组视图组件, 继承自ListView视图组件
    * 有 **多选, 单选** 二种模式;
    * 被动触发内容验证;
    
- **DropdownList**
    下拉菜单组件, 继承自ListView视图组件
    * 被动触发内容验证

- **Dialog**
    弹出窗口视觉组件, 继承自Panel视觉组件
    * 有 **模态, 非模态** 二种模式;

    - **Dialog.Header**
    - **Dialog.Footer**
    - **Dialog.Body**

- **CoverLayer**
    遮罩层视觉组件, 继承自View视图组件

- **Chart**
    图表视觉组件, 继承自View视图组件, 计划继续使用ECharts

- **Calendar**( Date | Time | DateTime )
    日历视觉组件, 继承自View视图组件
    * 有 **日期模式, 时间模式, 完全模式** 三种模式;

- **Editor**
    编辑器视觉组件, 继承自View视图组件

- **Switch**
    开关视觉组件, 集成自View视图
    * 仅 **开, 关**二种样式;

- **Slider**
    滑动型输入器, 视觉组件, 继承自View视图组件
    * 可以设置 **步长**
    * 可以设置 **范围**

## Business Components

大约 **5** 人日

- **TreeTable**
    树形表视觉组件

- **Drag & Drop**
    可拖拽视觉组件

## Colors Constants

| name | Color | Sample |
| --- | --- | --- |
| $color-0  | #263238 | <div style="width: 10px; height: 10px; background:#263238;"></div> |
| $color-1  | #37474f | <div style="width: 10px; height: 10px; background:#37474f;"></div> |
| $color-2  | #455a64 | <div style="width: 10px; height: 10px; background:#455a64;"></div> |
| $color-3  | #fff | <div style="width: 10px; height: 10px; background:#fff;"></div> |
| $color-4  | #04def7 | <div style="width: 10px; height: 10px; background:#04def7;"></div> |
| $color-5  | #bdbdbd | <div style="width: 10px; height: 10px; background:#bdbdbd;"></div> |
| $color-6  | #03a9f4 | <div style="width: 10px; height: 10px; background:#03a9f4;"></div> |
| $color-7  | #41535c | <div style="width: 10px; height: 10px; background:#41535c;"></div> |
| $color-8  | #00e5ff | <div style="width: 10px; height: 10px; background:#00e5ff;"></div> |
| $color-9  | #546e7a | <div style="width: 10px; height: 10px; background:#546e7a;"></div> |
| $color-10  | #dde1e3 | <div style="width: 10px; height: 10px; background:#dde1e3;"></div> |
| $color-11  | #37474f | <div style="width: 10px; height: 10px; background:#37474f;"></div> |
| $color-12  | #465862 | <div style="width: 10px; height: 10px; background:#465862;"></div> |
| $color-13  | #aab4b6 | <div style="width: 10px; height: 10px; background:#aab4b6;"></div> |
| $color-14  | #e51c23 | <div style="width: 10px; height: 10px; background:#e51c23;"></div> |
| $color-15  | #259b24 | <div style="width: 10px; height: 10px; background:#259b24;"></div> |
| $color-16  | rgba(0, 0, 0, .54) | <div style="width: 10px; height: 10px; background:rgba(0, 0, 0, .54);"></div> |
| $color-17  | rgba(0, 0, 0, .56) | <div style="width: 10px; height: 10px; background:rgba(0, 0, 0, .56);"></div> |
| $color-18  | rgba(0, 0, 0, .2) | <div style="width: 10px; height: 10px; background:rgba(0, 0, 0, .2);"></div> |
| $color-19  | rgba(0, 0, 0, .1) | <div style="width: 10px; height: 10px; background:rgba(0, 0, 0, .1;"></div> |
| $color-20  | rgba(0, 0, 0, .87) | <div style="width: 10px; height: 10px; background:rgba(0, 0, 0, .87);"></div> |
| $color-21  | rgba(0, 0, 0, .83) | <div style="width: 10px; height: 10px; background:rgba(0, 0, 0, .83);"></div> |
| $color-22  | rgba(0, 229, 255, .25)    | <div style="width: 10px; height: 10px; background:rgba(0, 229, 255, .25);"></div> |
| $color-23  | rgba(0, 229, 255, .15) | <div style="width: 10px; height: 10px; background:rgba(0, 229, 255, .15);"></div> |
| $color-24  | rgba(7, 151, 239, 239) | <div style="width: 10px; height: 10px; background:rgba(7, 151, 239, 239);"></div> |
| $color-25  | rgba(84, 110, 122, .26) | <div style="width: 10px; height: 10px; background:rgba(84, 110, 122, .26);"></div> |
| $color-26  | rgba(221, 225, 227, 0) | <div style="width: 10px; height: 10px; background:rgba(221, 225, 227, 0;"></div> |
| $color-27  | rgba(221, 225, 227, .5) | <div style="width: 10px; height: 10px; background:rgba(221, 225, 227, .5);"></div> |
| $color-28  | rgba(255, 244, 244, .54) | <div style="width: 10px; height: 10px; background:rgba(255, 244, 244, .54);"></div> |
| $color-29  | rgba(255, 255, 255, .87)  | <div style="width: 10px; height: 10px; background:rgba(255, 255, 255, .87);"></div> |
| $color-30  | rgba(255, 255, 255, .15) | <div style="width: 10px; height: 10px; background:rgba(255, 255, 255, .15);"></div> |
| $color-31  | rgba(255, 255, 255, .54) | <div style="width: 10px; height: 10px; background:rgba(255, 255, 255, .54);"></div> |
| $color-32  | rgba(255, 255, 255, .3) | <div style="width: 10px; height: 10px; background:rgba(255, 255, 255, .3);"></div> |
| $color-33  | rgba(255, 255, 255, .12) | <div style="width: 10px; height: 10px; background:rgba(255, 255, 255, .12;"></div> |
| $color-34  | rgba(255, 255, 255, .26) | <div style="width: 10px; height: 10px; background:rgba(255, 255, 255, .26);"></div> |
| $color-35  | rgba(255, 255, 255, 255) | <div style="width: 10px; height: 10px; background:rgba(255, 255, 255, 255);"></div> |

日期： 2017-8-3
