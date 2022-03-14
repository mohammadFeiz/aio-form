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

## read label from data

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
