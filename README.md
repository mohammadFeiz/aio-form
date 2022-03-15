# aio-form

# Instalation
```javascript
npm i aio-form
```
# Use
```javascript
import AIOForm from 'aio-form';
```
# Inputs
- text
- number
- textarea
- select
- multiselect
- radio
- checkbox
- datepicker
- rangedatepicker
- slider
- rangeslider
- table
- list
- color
- file

# props
Prop | Type | Default | Description
---- | ---- | ------- | -----------
data | json | {} | form data
items | array of objects | Required | form items
theme | json | Optional | form inline styles
config | object | Required | form config(title,subtitle,onChange,onSubmit,onClose,reset,print)

# config properties
Property | Type | Default | Description
---- | ---- | ------- | -----------
title | string | Optonal | form header title
subtitle | string | Optional | form header subtitle
onChange | function | Required | send changed data to parent component of form component 
onSubmit | function | Optional | call onSubmit props when user click on submit button
onClose | function | Optional | call onClose props when user click on close button
reset | boolean | false | show reset form button in form footer
print | boolean | false | show print form button in form footer




# items properties
Property | type | default | Use In | Description
-------- | ---- | ------- | ------ | -----------
label | string | Optional | All | Input Label
field | string | Required | All | define how read value from data
disabled | boolean or string | optional | All | set input disabled
hide | boolean or string | Optional | All | hide input or not
onChange | function or string | Optional | All | change data manually
rowKey | string | Optional | All | place inputs that have same rowKey in one row
rowSize | number | Optional | All | width of input in row
groupKey | string | Optional | All | place inputs that have same groupKey in one group
placeholder | string | Optional | text,number,textarea | Input placeholder 
text | string | Optional | multiselect,checkbox | Input Text
options | array or string | Required | select,multiselect,radio | selectable input options
optionWidth | string (?'px',?'%','fit-content') | 'fit-content' | radio | radio options width
calendarType | string ('gregorian' or 'jalali') | 'gregorian' | datepicker,rangedatepicker | calendar type
unit | string ('month','day','hour') | 'day' | datepicker,rangedatepicker | set datepicker monthly , daily or hourly
start | number or string | 0 | slider,rangeslider | start of slider
end | number or string | 100 | slider,rangeslider | end of slider
step | number | 1 | slider,rangeslider | change step of slider

## Input (type:'text'):

```javascript
class Test1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:{name:'',family:'',username:'',usercode:''}
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
          {type:'text',label:'User name',field:'username'},
          {type:'text',label:'User Code',field:'usercode'},
        ]}
      />
    );
  }
}
```
![alt text](/images/basic.jpg)

## More complicated field

```javascript
class Test2 extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:{
        user:{
          name:'',
          family:'',
          username:'',
          usercode:''
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
![alt text](/images/basic.jpg)

## read label dynamically by execute label string.(contain calc in first of label property)

```javascript
class Test3 extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:{
        user:{
          name:'',
          family:'',
          username:'',
          usercode:''
        },
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
## item rowKey property

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

## item rowSize property

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

## item disabled property static (boolean)

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

## item disabled property dynamic(string)
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

## item hide property ( boolean )
hide item statically by set hide:true
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

## item hide property ( string )
hide item dynamically by execute hide string.(contain calc in first of hide property)
```javascript
  ...
  items={[
    {type:'text',label:'Name',field:'user.name'},
    {type:'text',label:'Family',field:'user.family'},
    {type:'text',label:'User Name',field:'user.username'},
    {type:'text',label:'User Code',field:'user.usercode',hide:'calc !data.user || !data.user.username'},
  ]}
  ...
      
```
![alt text](/images/showString.gif)

## item onChange property ( function )
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

## item onChange property ( string )
set onChange string on item for manual changing data
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
            onChange:`
              data.user.name = value; 
              data.user.fullName = (data.gender === 'male'?'Mr':'Mrs') + ' ' + data.user.name + ' ' + data.user.family; 
            `
          },
          {
            type:'text',label:'Family',field:'user.family',
            onChange:`
              data.user.family = value;
              data.user.fullName = (data.gender === 'male'?'Mr':'Mrs') + ' ' + data.user.name + ' ' + data.user.family; 
            `
          },
          {
            type:'radio',label:'Gender',field:'gender',
            onChange:`
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


## item placeholder property ( string )
if use calc in first of item.placeholder it will read placeholder value from data
else placeholder will be placeholder value
```javascript
  ...
  items={[
    {
      type:'text',label:'Name',field:'name',
      placeholder:'calc data.defaultName'//read from data
    },
    {
      type:'number',label:'age',field:'age',
      placeholder:'inter age'//hard code
    },
    {
      type:'textarea',label:'Description',field:'description',
      placeholder:'inter description'// hard code
    }
  ]}
  ...
      
```
![alt text](/images/placeholder.gif)
## input text options propery ( array )
```javascript
  ...
  items={[
    {
      type:'text',label:'Name',field:'name',
      options:[
        {text:'john doe'},
        {text:'mohammad feiz'},
        {text:'robert anderson'}
      ]
    },
  ]}
  ...
      
```
![alt text](/images/textoptions.gif)

## input text options propery ( string )
read text options dynamically by execute options string.(contain calc in first of options string)
```javascript
  class Test1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:{
        nameOptions:[
          {text:'john doe'},
          {text:'mohammad feiz'},
          {text:'robert anderson'}
        ]
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
            type:'text',label:'Name',field:'name',
            options:'calc data.nameOptions'
          },
        ]}
      />
    );
  }
}

      
```
![alt text](/images/textoptions.gif)

## select (static options)
```javascript
  class Test1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:{
        gender:false,
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
            type:'select',label:'Gender',field:'gender',
            options:[
              {text:'Not Selected',value:false},
              {text:'Male',value:'male'},
              {text:'Female',value:'female'}
            ]
          },
          {
            type:'text',label:'Gender Preview',field:'gender',disabled:true
          },
        ]}
      />
    );
  }
}
      
```
![alt text](/images/select.gif)

## select (dynamic options)
```javascript
  class Test1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:{
        gender:false,
        genderOptions:[
          {text:'Not Selected',value:false},
          {text:'Male',value:'male'},
          {text:'Female',value:'female'}
        ]
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
            type:'select',label:'Gender',field:'gender',
            options:'calc data.genderOptions'
          },
          {
            type:'text',label:'Gender Preview',field:'gender',disabled:true
          },
        ]}
      />
    );
  }
}
      
```
![alt text](/images/select.gif)


## multiselect (static options)
```javascript
  class Test1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:{
        skills:[]
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
            type:'multiselect',label:'Skills',field:'skills',
            options:[
              {text:'js',value:'js'},
              {text:'css',value:'css'},
              {text:'html',value:'html'}
            ]
          },
          {
            type:'text',label:'skills Preview',field:'skills',disabled:true
          },
        ]}
      />
    );
  }
}
      
```
![alt text](/images/multiselect.gif)

## multiselect (dynamic options)
```javascript
  class Test1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:{
        skills:[],
        skillsOptions:[
          {text:'Not Selected',value:false},
          {text:'Male',value:'male'},
          {text:'Female',value:'female'}
        ]
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
            type:'multiselect',label:'Skills',field:'skills',
            options:'calc data.skillsOptions'
          },
          {
            type:'text',label:'skills Preview',field:'skills',disabled:true
          },
        ]}
      />
    );
  }
}
      
```
![alt text](/images/multiselect.gif)

## radio (static options)
```javascript
  class Test1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:{
        gender:'1'
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
            type:'radio',label:'Gender',field:'gender',
            options:[
              {text:'Male',value:'1'},
              {text:'Female',value:'2'}
            ]
          },
          {
            type:'text',label:'Gender Preview',field:'gender',disabled:true
          },
        ]}
      />
    );
  }
}
      
```
![alt text](/images/radio.gif)



## radio (dynamic options)
```javascript
  class Test1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:{
        gender:'1',
        genderOptions:[
          {text:'Male',value:'1'},
          {text:'Female',value:'2'}
        ]
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
            type:'radio',label:'Gender',field:'gender',
            options:'calc data.genderOptions'
          },
          {
            type:'text',label:'Gender Preview',field:'gender',disabled:true
          },
        ]}
      />
    );
  }
}
      
```
![alt text](/images/radio.gif)

## checkbox
```javascript
  class Test1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:{
        active:false
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
            type:'checkbox',label:'Activity',field:'active',text:'Activity'
          }
        ]}
      />
    );
  }
}
      
```
![alt text](/images/checkbox.gif)

