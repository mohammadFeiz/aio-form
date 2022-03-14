# aio-form

## Basic:

```javascript
class Test1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:{}
    }
  }
  render(){
    let {data} = this.state;
    return (
      <AIOForm
        data={data}
        config={{
          onChange:(changedData)=>{
            this.setState({data:changedData});
            console.log(changedData)
          }
        }}
        items={[
          {type:'text',label:'Name',field:'name'},
          {type:'text',label:'Family',field:'family'},
          {type:'text',label:'Username',field:'name'},
          {type:'text',label:'User Code',field:'code'},
        ]}
      />
    );
  }
}
```
![alt text](/images/basic.jpg)
- ##### log of changedData
```javascript
{
    "name": "joun",
    "family": "doe",
    "username": "john123",
    "usercode": "2288"
}
```

## More complicated field

```javascript
class Test2 extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:{}
    }
  }
  render(){
    let {data} = this.state;
    return (
      <AIOForm
        data={data}
        config={{
          onChange:(changedData)=>{
            console.log(changedData);
            this.setState({data:changedData})
          }
        }}
        items={[
          {type:'text',label:'Name',field:'user.name'},
          {type:'text',label:'Family',field:'user.family'},
          {type:'text',label:'Username',field:'user.username'},
          {type:'text',label:'User Code',field:'user.usercode'},
        ]}
      />
    );
  }
}
```
![alt text](/images/basic.jpg)
- ##### log of chagedData
```javascript
{
    "user": {
        "name": "john",
        "family": "doe",
        "username": "john123",
        "usercode": "2288"
    }
}
```

## read label from data by dynamic string using calc ...

```javascript
class Test3 extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:{
        labels:{
          name:'Name',
          family:'Family', 
          username:'User Name',
          usercode:'User Code'
        }
      }
    }
  }
  render(){
    let {data} = this.state;
    console.log(data)
    return (
      <AIOForm
        data={data}
        config={{
          onChange:(changedData)=>{
            console.log(changedData);
            this.setState({data:changedData})
          }
        }}
        items={[
          {type:'text',label:'calc data.labels.name',field:'user.name'},
          {type:'text',label:'calc data.labels.family',field:'user.family'},
          {type:'text',label:'calc data.labels.username',field:'user.username'},
          {type:'text',label:'calc data.labels.usercode',field:'user.usercode'},
        ]}
      />
    );
  }
}
```
![alt text](/images/readlabelfromdata.jpg)
## rowKey

```javascript
  ...
  items={[
    {type:'text',label:'Name',field:'user.name',rowKey:'1'},
    {type:'text',label:'Family',field:'user.family',rowKey:'1'},
    {type:'text',label:'User Name',field:'user.username',rowKey:'2'},
    {type:'text',label:'User Code',field:'user.usercode',rowKey:'2'},
  ]}
  ...
      
```
![alt text](/images/rowKey.jpg)

## rowSize

```javascript
  ...
  items={[
    {type:'text',label:'Name',field:'user.name',rowKey:'1',rowSize:100},
    {type:'text',label:'Family',field:'user.family',rowKey:'1'},
    {type:'text',label:'User Name',field:'user.username',rowKey:'2'},
    {type:'text',label:'User Code',field:'user.usercode',rowKey:'2',rowSize:100},
  ]}
  ...
      
```
![alt text](/images/rowSize.jpg)

## disabled(boolean)

```javascript
  ...
  items={[
    {type:'text',label:'Name',field:'user.name'},
    {type:'text',label:'Family',field:'user.family'},
    {type:'text',label:'User Name',field:'user.username'},
    {type:'text',label:'User Code',field:'user.usercode',disabled:true},
  ]}
  ...
      
```
![alt text](/images/disabled.jpg)

## disabled dynamic(string)
set disabled dynamically by read data.user.username
```javascript
  ...
  items={[
    {type:'text',label:'Name',field:'user.name'},
    {type:'text',label:'Family',field:'user.family'},
    {type:'text',label:'User Name',field:'user.username'},
    {type:'text',label:'User Code',field:'user.usercode',disabled:'calc !data.user.username'},
  ]}
  ...
      
```
![alt text](/images/disabled.gif)

## show ( boolean )
set disabled dynamically by read data.user.username
```javascript
  ...
  items={[
    {type:'text',label:'Name',field:'name'},
    {type:'text',label:'Family',field:'family'},
    {type:'text',label:'Username',field:'username'},
    {type:'text',label:'User Code',field:'usercode',show:false},
  ]}
  ...
      
```
![alt text](/images/showBoolean.jpg)

## show ( string )
hide item dynamically by read data.user.username
```javascript
  ...
  items={[
    {type:'text',label:'Name',field:'user.name'},
    {type:'text',label:'Family',field:'user.family'},
    {type:'text',label:'User Name',field:'user.username'},
    {type:'text',label:'User Code',field:'user.usercode',hideCondition:'!data.user || !data.user.username'},
  ]}
  ...
      
```
![alt text](/images/showString.gif)
