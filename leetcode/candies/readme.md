- 分糖果
  偶数长度的数组 even [1,1,2,2,3,4]
  其中不同的数字代表不同种类的糖果
  这些糖果平均分给一个弟弟和一个妹妹。返回妹妹可以获得的最大糖果的种类数。

  var arr;


  - 特点: arr.length/2 
  - 种类数 去重 unique()  Set()

  - 算法用两种语言来解 js+python
  优雅
  1. 编写格式很严格
    tab 缩进 对齐代码   :代码块逻辑 代替{}
  2.  静态类型检查是JS 没有的
    candies:List[int] 形参 类型的约束
    def name() -> int
    函数式风格 len() min()