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

## read label dynamically by execute label string.(contain calc in first of string)

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
disable item dynamically by execute disabled string.(contain calc in first of string)
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

## hide ( boolean )
if hide = true item will be hidden
```javascript
  ...
  items={[
    {type:'text',label:'Name',field:'user.name'},
    {type:'text',label:'Family',field:'user.family'},
    {type:'text',label:'User Name',field:'user.username'},
    {type:'text',label:'User Code',field:'user.usercode',hide:true},
  ]}
  ...
      
```
![alt text](/images/showBoolean.jpg)

## hide ( string )
hide item dynamically by execute hide string.(contain calc in first of string)
```javascript
  ...
  items={[
    {type:'text',label:'Name',field:'user.name'},
    {type:'text',label:'Family',field:'user.family'},
    {type:'text',label:'User Name',field:'user.username'},
    {type:'text',label:'User Code',field:'user.usercode',hide:'!data.user || !data.user.username'},
  ]}
  ...
      
```
![alt text](/images/showString.gif)

## item.onChange ( function )
set onChange on item for manual changing data
```javascript
  class Test1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:{
        gender:'male',
        user:{
          name:'',
          family:'',
          fullName:''
        }
      }
    }
  }
  render(){
    let {data} = this.state;
    return (
      <AIOForm
        data={data}
        config={{
          onChange:(changedData)=>{
            this.setState({data:changedData}) 
          } 
        }}
        items={[
          {
            type:'text',label:'Name',field:'user.name',
            onChange:(data,field,value)=>{
              data.user.name = value;
              data.user.fullName = (data.gender === 'male'?'Mr':'Mrs') + ' ' + data.user.name + ' ' + data.user.family; 
              return data
            }
          },
          {
            type:'text',label:'Family',field:'user.family',
            onChange:(data,field,value)=>{
              data.user.family = value;
              data.user.fullName = (data.gender === 'male'?'Mr':'Mrs') + ' ' + data.user.name + ' ' + data.user.family; 
              return data
            }
          },
          {
            type:'radio',label:'Gender',field:'gender',
            onChange:(data,field,value)=>{
              data.gender = value;
              data.user.fullName = (data.gender === 'male'?'Mr':'Mrs') + ' ' + data.user.name + ' ' + data.user.family; 
              return data
            },
            options:[
              {text:'Male',value:'male'},
              {text:'Female',value:'female'}
            ]
          },
          {type:'text',label:'Full Name',field:'user.fullName',disabled:true}
        ]}
      />
    );
  }
}
      
```
![alt text](/images/onChangeFunction.gif)

## item.onChange ( string )
set onChange on item for manual changing data
```javascript
  class Test1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:{
        gender:'male',
        user:{
          name:'',
          family:'',
          fullName:''
        }
      }
    }
  }
  render(){
    let {data} = this.state;
    return (
      <AIOForm
        data={data}
        config={{
          onChange:(changedData)=>{
            this.setState({data:changedData}) 
          } 
        }}
        items={[
          {
            type:'text',label:'Name',field:'user.name',
            changeString:`
              data.user.name = value; 
              data.user.fullName = (data.gender === 'male'?'Mr':'Mrs') + ' ' + data.user.name + ' ' + data.user.family; 
            `
          },
          {
            type:'text',label:'Family',field:'user.family',
            changeString:`
              data.user.family = value;
              data.user.fullName = (data.gender === 'male'?'Mr':'Mrs') + ' ' + data.user.name + ' ' + data.user.family; 
            `
          },
          {
            type:'radio',label:'Gender',field:'gender',
            changeString:`
              data.gender = value;
              data.user.fullName = (data.gender === 'male'?'Mr':'Mrs') + ' ' + data.user.name + ' ' + data.user.family; 
            `,
            options:[
              {text:'Male',value:'male'}, 
              {text:'Female',value:'female'}
            ]
          },
          {type:'text',label:'Full Name',field:'user.fullName',disabled:true}
        ]}
      /> 
    );
  }
}
      
```
![alt text](/images/onChangeFunction.gif)
