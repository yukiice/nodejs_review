# Buffer

在`Node.js`中，`Buffer`类用于在`TCP`流，文件操作系统以及其他上下文中处理二进制数据流（读取或者写入文件、网络连接、数据压缩/解压等场景）。`Buffer`类在全局作用域中，因此无需进行`require`引用。



## `Buffer`的基本使用

### 1.`alloc()`

`Buffer.alloc(size[, fill[, encoding]])` 是 Node.js 中 Buffer 类的一个静态方法，用于创建一个新的、指定大小的 Buffer 对象，并用 `0` 填充。你也可以通过提供 `fill` 参数来指定其他的填充值。

这个方法接受三个参数：

- `size`：新 Buffer 的大小（字节数）。
- `fill`：用来填充新 Buffer 的值。可以是一个字符串、一个 Buffer 或一个数字。默认为 `0`。
- `encoding`：如果 `fill` 是一个字符串，这是它的字符编码。默认为 `'utf8'`。

这个方法返回一个新的 Buffer。

```javascript
// 创建一个长度为10 且用0填充的Buffer
const buf1 = Buffer.alloc(10);
console.log(buf1);
// <Buffer 00 00 00 00 00 00 00 00 00 00>
```

还有一种方法是使用`allocUnSafe(size)`创建一个新的指定大小的`Buffer`

但是它不会初始化这个`buffer`的内容，也就是说新的`Buffer`的内容是未知的，并且可能包含敏感数据

**当你使用 `Buffer.allocUnsafe()` 创建一个 `Buffer` 时，你实际上是在分配一块内存空间，但这块内存空间可能之前已经被其他数据占用过。这些数据可能是之前的 `Buffer` 对象，也可能是其他类型的数据。如果你不清除或覆盖这个 `Buffer`，那么这个 `Buffer` 就可能包含这些旧的、敏感的数据。**

如果使用`Buffer.allocUnSafe()`创建,**通常需要使用`fill()`或者`write()`来重写`Buffer`的内容**

```javascript
// 创建一个未初始化的 Buffer
const buf = Buffer.allocUnsafe(10);

// 打印 Buffer 的内容
console.log(buf);

// 使用 fill 方法清空 Buffer
buf.fill(0);

// 再次打印 Buffer 的内容
console.log(buf);
```



### 2.`write()`

`Buffer.write(string[, offset[, length]][, encoding])` 是 Node.js 中 Buffer 类的一个实例方法，用于将字符串写入到 Buffer 中。

这个方法接受四个参数：

- `string`：要写入的字符串。
- `offset`：开始写入的索引值，即在 buffer 中开始写入的位置。默认为 `0`。
- `length`：写入的字节数。默认为 `buffer.length - offset`。
- `encoding`：如果 `string` 是字符串，则这是字符编码。默认为 `'utf8'`。

这个方法返回实际写入的大小。如果 buffer 空间不足， 则只会写入部分字符串。

```javascript
const buf3 =  Buffer.alloc(123)
const newBuf = buf3.write('hello world')
console.log('写入的字节数',newBuf)
// 写入的字节数 11
```

### 3.`from()`

`Buffer.from()` 是 `Node.js` 中 `Buffer` 类的一个静态方法，用于创建一个新的 `Buffer` 实例。

这个方法接受三种类型的参数：

- 字符串：创建一个包含所给字符串的新 `Buffer`。默认编码为 `utf8`，但可以通过提供第二个参数来指定其他编码，如 `ascii`、`base64`、`hex` 等。

- 数组：创建一个包含所给数组中的字节的新 `Buffer`。

- `Buffer`：创建一个新的 `Buffer`，其内容为所给 `Buffer` 的一个副本。

```javascript
const buf4 = Buffer.from('Hello Buffer');
console.log(buf4.toString());
// Hello Buffer
```

### 4.`concat()`

`Buffer.concat(list[, totalLength])` 是 `Node.js `中 `Buffer` 类的一个静态方法，用于将一组 `Buffer` 对象连接（`concatenate`）起来，返回一个新的 `Buffer` 对象。

这个方法接受两个参数：

- `list`：一个 `Buffer` 对象的数组，这些 `Buffer` 对象将被连接起来。
- `totalLength`：可选参数，指定返回的新 `Buffer` 对象的长度。如果没有提供这个参数，那么新 `Buffer` 对象的长度将等于 `list` 中所有 `Buffer` 对象的长度之和。

```javascript
const buffer1 = Buffer.from('Hello ');
const buffer2 = Buffer.from('Buffer');
const buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 内容: " + buffer3.toString());
// buffer3 内容: Hello Buffer
```



### 4.`compare()`

`buffer.compare(target)` 是 `Node.js `中  `Buffer`  类的一个方法，用于比较两个 `Buffer` 对象。这个方法返回一个数字，表示 `buffer` 和 `target` 在字典序上的比较结果。

- 如果 `buffer` 在 `target` 之前，返回 -1。
- 如果 `buffer` 等于 `target`，返回 0。
- 如果 `buffer` 在 `target` 之后，返回 1。

```javascript
const buffer4 = Buffer.from('ABC');
const buffer5 = Buffer.from('ABCD');
const result = buffer1.compare(buffer2);
if(result < 0) {
   console.log(buffer4 + " 在 " + buffer5 + "之前");
}else if(result == 0){
   console.log(buffer4 + " 与 " + buffer5 + "相同");
}else {
   console.log(buffer4 + " 在 " + buffer5 + "之后");
}
// ABC 在 ABCD之后
```



### 5.`fill()`

`Buffer.fill()` 方法用于填充 `Buffer` 对象的指定区域，使用指定的值。这个方法会改变原来的 Buffer 对象。

`Buffer.fill()` 方法接受三个参数：

- `value`：填充的值，可以是一个数值、字符串、`Buffer` 或者整数。默认为 `0`。
- `start`：开始填充的位置。默认为 `0`。
- `end`：结束填充的位置（不包含）。默认为 `buffer.length`。

```javascript
const buf = Buffer.from('Hello World');
buf.fill('a', 2, 5);
console.log(buf.toString());  // Heaaao World
```







