import React,{Component,createContext,createRef} from "react";
import RVD from 'react-virtual-dom';
import AIOButton from 'aio-button';
import {Icon} from '@mdi/react';
import {mdiCalendarBlankOutline,mdiPlusThick,mdiClose,mdiMinusThick,mdiAttachment} from '@mdi/js';
import $ from 'jquery'; 
import Slider from 'r-range-slider';
import Table from 'aio-table';
import GAH from 'gah-datepicker';
import AIOValidation from 'aio-validation';
import "./index.css";
let AIOFormContext = createContext()

export default class AIOForm extends Component{
    constructor(props){
      super(props);
      this.dom = createRef(); 
      this.components = {
        text:FormTextbox,number:FormTextbox,textarea:FormTextbox,select:FormSelect,multiselect:FormSelect,datepicker:FormDatepicker,message:FormMessage,
        rangedatepicker:FormDatepicker,slider:FormSlider,rangeslider:FormSlider,radio:FormCheck,checklist:FormCheck,checkbox:FormCheck,
        table:FormTable,list:FormList,color:FormColor,file:FormFile
      }
      let {data} = this.props;
      this.state = {splitterDictionary:{},startData:JSON.stringify(data)}
    }
    getHeaderStyle(){
      let {theme} = this.props;
      return {
        height:theme.headerHeight,padding:theme.headerPadding!== undefined?`0 ${theme.headerPadding}px`:undefined,
        background:theme.headerBG,color:theme.headerColor
      }
    }
    getBodyStyle(){
      let {theme} = this.props;
      return {padding:theme.bodyPadding,color:theme.bodyColor,background:theme.bodyBG}
    }
    getFooterStyle(){
      let {theme} = this.props;
      let style = {background:theme.footerBG,height:theme.footerHeight}
      if(theme.footerBorderColor){style.borderTop = `1px solid ${theme.footerBorderColor}`}
      return style;
    }
    getFooterButtonStyle(){
      let {theme} = this.props;
      let style = {
        height:theme.footerButtonHeight,
        color:theme.footerBTNColor,
        background:theme.footerBTNBG,
        fontSize:theme.footerButtonFontSize
      }
      if(theme.footerBTNPadding !== undefined){style.padding = `0 ${theme.footerBTNPadding}px`}
      if(theme.footerBTNRound !== undefined){style.borderRadius = theme.footerBTNRound}
      if(theme.footerBTNBorderWidth){style.border = `${theme.footerBTNBorderWidth}px solid ${theme.footerBTNBorderColor}`}
      return style 
    }
    getSplitterStyle(){
      let {theme} = this.props;
      let style = {height:theme.splitterHeight,fontSize:theme.splitterFontSize,color:theme.splitterColor,background:theme.splitterBG}
      if(theme.splitterMargin !== undefined){style.margin = `${theme.splitterMargin}px 0`}
      return style;
    } 
    getHeaderLayout(){
      let {data,header = {},onClose = ()=>{}} = this.props;
      if(!header.title && !header.titleField){return {html:''}}
      let {titleField,subtitleField,title,subtitle} = header;
      let headerTitle,headerSubtitle;
      if(titleField){headerTitle = data[titleField]}
      if(!headerTitle){headerTitle = title}
      if(subtitleField){headerSubtitle = data[subtitleField]}
      if(!headerSubtitle){headerSubtitle = subtitle}
      if(!headerTitle){return {html:''}}
      return { 
          html:()=>(
            <div className='aio-form-header' style={this.getHeaderStyle()}>
              <div className='aio-form-header-title' key='title'> 
                <div className='aio-form-header-uptitle'>{headerTitle}</div>
                {headerSubtitle !== undefined && <div className='aio-form-header-subtitle'>{headerSubtitle}</div>}  
              </div>  
              <div className='aio-form-header-icon' onClick={onClose}><Icon path={mdiClose} size={0.8}/></div>
            </div>  
          )
      }
    }
    onSubmit(data){
      let {onSubmit} = this.props;
      if($(this.dom.current).find('.aio-form-error').length){alert('there is errors')}
      onSubmit(data);
    }
    getOptions(item){
      let {data} = this.props;
      let options;
      if(item.optionsField){
        options = data[item.optionsField];
        if(!options){options = item.options}
      }
      else {options = item.options;}
      if(!Array.isArray(options)){options = [];}
      return options.map((o)=>{
        if(typeof o !== 'object'){return {text:o,value:o}}
        if(!item.textField){console.error('aio-form => missing textField')}
        if(!item.valueField){console.error('aio-form => missing valueField')}
        return {text:o[item.textField],value:o[item.valueField]}
      })
    }
    sortByRows(items){
      let res = {};
      let result = [];
      for(let i = 0; i < items.length; i++){
        if(items[i].type === 'splitter'){
          let a = 'a' + Math.random()
          res[a] = [items[i]];
          result.push(res[a]);
          continue;  
        }
        let {rowId = 'a' + Math.random()} = items[i];
        if(!res[rowId]){res[rowId] = []; result.push(res[rowId])}
        res[rowId].push(items[i])  
      }
      return result;
    }
    getLabelStyle(){
      let {theme} = this.props;
      let style = {fontSize:theme.labelFontSize,color:theme.labelColor,width:theme.inline?120:'100%',height:theme.labelHeight}
      if(theme.labelPadding !== undefined){style.padding =`0 ${theme.labelPadding}px`}
      return style
    }
    getResultByConditions(conditions){
      let {data} = this.props;
      for(let i = 0; i < conditions.length; i++){
        let {operator,value,field,type} = conditions[i];
        let fieldValue = data[field];
        if(fieldValue === undefined || value === undefined){return false}
        if(Array.isArray(fieldValue)){fieldValue = fieldValue.length}
        if(type === 'number'){value = parseFloat(value)}
        if(type === 'boolean'){value = JSON.parse(value)}
        if(operator === '='){if(fieldValue !== value){return false}}
        if(operator === '!='){if(fieldValue === value){return false}}
        if(operator === '<'){if(fieldValue >= value){return false}}
        if(operator === '<='){if(fieldValue > value){return false}}
        if(operator === '>'){if(fieldValue <= value){return false}}
        if(operator === '>='){if(fieldValue < value){return false}}
      }
      return true;
    }
    getItem(o){
      let {splitterDictionary} = this.state;
      let {theme,data,lang} = this.props;
      if(o.type === 'splitter'){
        splitterDictionary[o.id] = splitterDictionary[o.id] === undefined?true:splitterDictionary[o.id];
        return {
          html:(
            <div 
              style={this.getSplitterStyle()}
              className='aio-form-splitter' 
              onClick={()=>{
                splitterDictionary[o.id] = !splitterDictionary[o.id];
                this.setState({splitterDictionary})
              }}
            >
              <div className='aio-form-splitter-icon'>
                <Icon path={splitterDictionary[o.id] === false?mdiPlusThick:mdiMinusThick} size={0.6}/>
              </div>
              {o.text}
            </div>
          )
        }
      }
      if(o.splitterId && splitterDictionary[o.splitterId] === false){return null}
      if(o.show === false){return null}
      if(o.type === 'table' && (!o.columns || !o.columns.length)){return null}
      if(!o.conditions){o.conditions = [];}
      if(!this.getResultByConditions(o.conditions)){return null}
      let label = o.editLabel || o.label || false;
      let value = data[o.field];
      let FormComponent = this.components[o.type];
      let error = o.errors && o.errors.length?AIOValidation({ 
        value,errors:o.errors,label,lang, 
        translate:(text)=>{
          if(o.type === 'select' || item.type === 'radio'){return o.options.filter((o)=>o.value === text)[0].text;}
          return text;
        }
      }):'';
      return {
        attrs:{style:{marginBottom:theme.inputMargin},className:'aio-form-item'},
        column:[
          {
            [!theme.inline?'column':'row']:[
              {show:label !== false,html:<div className='aio-form-label' style={this.getLabelStyle()}>{label}</div>},
              {
                flex:theme.inline?1:undefined,
                column:[
                  {html:()=><FormComponent item={o}/>},
                  {
                    attrs:{className:'aio-form-error'},show:error !== '',
                    html:()=>error
                  }
                ]            
              }
            ]
          }
        ],
      }
    }
    render(){
      let {data,theme,items,onChange,lang,className,footer,onClose,style = {}} = this.props;
      let {startData} = this.state;
      let headerLayout;
      try{headerLayout = this.getHeaderLayout()}
      catch{headerLayout = this.getHeaderLayout()}
      if(theme.bodyFontSize !== undefined){
        style.fontSize = theme.bodyFontSize;
      }
        return (
            <AIOFormContext.Provider value={{data,items,theme,lang,onChange,getOptions:this.getOptions.bind(this)}}>
              <RVD
                layout={{
                  attrs:{ref:this.dom,className:'aio-form' + (className?' ' + className:''),style:{...theme,direction:lang === 'fa'?'rtl':'ltr',...style}},
                  column:[
                    headerLayout,
                    {
                        flex:1,attrs:{className:'aio-form-body',style:this.getBodyStyle()},
                        column:this.sortByRows(items).map((item)=>{
                          return {gap:12,row:item.map((o)=>{
                            return {...this.getItem(o),flex:o.rowSize?undefined:1,size:o.rowSize}
                          })}
                        })
                    },
                    {
                      show:typeof footer === 'object',
                      html:()=>(
                        <div className='aio-form-footer' style={this.getFooterStyle()}>
                          {
                            footer.onClose && 
                            <button style={this.getFooterButtonStyle()} onClick={()=>footer.onClose(data)}>{lang === 'fa'?'بستن':'close'}</button>
                          }
                          {
                            footer.reset &&
                            <button style={this.getFooterButtonStyle()} onClick={()=>onChange(JSON.parse(startData))}>{lang === 'fa'?'تنظیم مجدد':'reset'}</button> 
                          }
                          {
                            footer.onSubmit &&
                            <button style={this.getFooterButtonStyle()} onClick={()=>{
                              if($(this.dom.current).find('.aio-form-error').length){return;}
                              footer.onSubmit(data)
                            }}>{lang === 'fa'?'ارسال':'submit'}</button> 
                          }
                        </div>  
                      )
                    } 
                  ]
                }}
              />
       
            </AIOFormContext.Provider>
        );
    }
}
AIOForm.defaultProps = {
  theme:{},data:{},items:[],onChange:()=>{},lang:'en'
}

class FormMessage extends Component{
  static contextType = AIOFormContext;
  getStyle(){
    let {theme} = this.context;
    let style = {width:'100%',color:theme.messageColor,fontSize:theme.messageFontSize || theme.bodyFontSize}
    return style;
  }
  render(){
    let {item} = this.props;
    let {data} = this.context;
    let message;
    try{message = data[item.messageField] || item.message;}
    catch{message = item.message}
    return <div style={this.getStyle()} className='aio-form-input aio-form-input-message'>{message}</div>
  }
}
class FormSelect extends Component{
  static contextType = AIOFormContext;
  getStyle(){
    let {theme} = this.context;
    let style = {height:theme.inputHeight,minHeight:theme.inputHeight,width:'100%'}
    if(theme.inputBorderColor){style.border = `1px ${theme.inputBorderType || 'solid'} ${theme.inputBorderColor}`}
    if(theme.inputBorderRadius !== undefined){style.borderRadius = theme.inputBorderRadius;}
    if(theme.inputBG){style.background = theme.inputBG;}
    if(theme.inputPadding !== undefined){style.padding = `0 ${theme.inputPadding}px`;}
    return style;
  }
  onChange(value){
    let {data,onChange} = this.context;
    let {item} = this.props;
    data[item.field] = value
    onChange(data)
  }
  render(){
    let {item} = this.props;
    let {data,theme,lang,getOptions} = this.context;
    let value = data[item.field];
    let props = {}
    if(item.type === 'select'){props.value = value;}
    if(item.type === 'multiselect'){
      props.tagStyle = {color:theme.tagColor,background:theme.tagBG,fontSize:theme.tagFontSize}
      props.values = value || [];
      props.selectAll = true;
    }
    props.options = JSON.parse(JSON.stringify(getOptions(item)))
    props.search = props.options.length > 12;
    return (
      <AIOButton 
        {...item} {...props} rtl={lang === 'fa'} style={this.getStyle()}
        className={`aio-form-input aio-form-input-${item.type}`}
        onChange={(val)=>this.onChange(val)}
        popupStyle={{maxHeight:400}}
        popupWidth='fit'
      />
    );
  }
}
class FormCheck extends Component{
  static contextType = AIOFormContext;
  onChange(value){
    let {data,onChange} = this.context;
    let {item} = this.props;
    data[item.field] = value
    onChange(data)
  }
  getStyle(){
    let {theme} = this.context;
    let style = {minHeight:theme.inputHeight,padding:0}
    if(theme.inputBorderColor){style.border = `1px ${theme.inputBorderType || 'solid'} ${theme.inputBorderColor}`}
    if(theme.inputBorderRadius !== undefined){style.borderRadius = theme.inputBorderRadius;}
    if(theme.inputBG){style.background = theme.inputBG;}
    return style;
  }
  getIcon(){
    let {theme} = this.context;
    return {
      size:[theme.checkboxOuterSize || 12,theme.checkboxInnerSize || 10,theme.checkboxBorderWidth === undefined?1:theme.checkboxBorderWidth],
      color:[theme.checkboxOuterColor || 'dodgerblue',theme.checkboxInnerColor || 'dodgerblue']
    }
  }
  render(){
    let {item} = this.props;
    let {data,theme,getOptions} = this.context;
    let value = data[item.field];
    let props = {
      ...item,style:this.getStyle(),className:`aio-form-input aio-form-input-${item.type}`,
      optionStyle:{height:theme.inputHeight},icon:this.getIcon()
    }
    if(theme.inputPadding !== undefined){props.optionStyle.padding = `0 ${theme.inputPadding}px`}
    if(item.type === 'radio'){
      props.optionWidth = item.optionWidth || 'fit-content';
      props.type = 'radio';
      props.options = getOptions(item);
      props.onChange = (val)=>this.onChange(val);
      props.value = value;
    }
    else if(item.type === 'checklist'){
      props.optionWidth = item.optionWidth || 'fit-content';
      props.type = 'checklist';
      if(!Array.isArray(value)){props.values = []} else {props.values = value}
      props.value = getOptions({...item,options:value});
      props.onChange = (val,index)=>{value[index][item.valueField] = val; this.onChange(value)}
    }
    else if(item.type === 'checkbox'){
      props.optionWidth = '100%';
      props.type = 'checklist';
      props.value = [{text:item.text,value}];
      props.onChange = (val)=>{
        this.onChange(val);
      };
    }
    return <AIOButton {...props}/>
  }
}
class FormTextbox extends Component{
  static contextType = AIOFormContext;
  constructor(props){
    super(props);
    this.state = {
      textPreview:'',prev:''
    }
  }
  onChange(value){
    this.setState({textPreview:value});
    clearTimeout(this.timeout);
    this.timeout = setTimeout(()=>{
      let {data,onChange} = this.context;
      let {item} = this.props;
      if(item.type === 'number'){
        value = parseFloat(value);
        if(isNaN(value)){value = ''}
      }
      data[item.field] = value
      onChange(data)
    },500);
  }
  getStyle(){
    let {theme} = this.context;
    let {item} = this.props;
    let style = {};
    if(item.type !== 'textarea'){style = {height:theme.inputHeight,minHeight:theme.inputHeight,padding:theme.inputPadding !== undefined?`0 ${theme.inputPadding}px`:undefined}}
    else {style = {padding:theme.inputPadding!== undefined?theme.inputPadding:undefined}}
    if(theme.inputBorderColor){style.border = `1px ${theme.inputBorderType || 'solid'} ${theme.inputBorderColor}`}
    if(theme.inputBorderRadius !== undefined){style.borderRadius = theme.inputBorderRadius;}
    if(theme.inputBG){style.background = theme.inputBG;}
    return style;
  }
  render(){
    let {item} = this.props;
    let {data} = this.context;
    let {textPreview,prev} = this.state;
    let value = data[item.field];
    if(prev !== value){
      setTimeout(()=>this.setState({prev:value,textPreview:value}),0);
    }
    let props = {...item,style:this.getStyle(),className:`aio-form-input aio-form-input-${item.type}`,value:textPreview,onChange:(e)=>this.onChange(e.target.value)}
    if(item.type === 'textarea'){return <textarea {...props}/>}
    return <input {...props}/>
  }
}
class FormList extends Component{
  static contextType = AIOFormContext;
  constructor(props){
    super(props);
    this.state = {preview:[],prev:'[]'}
  }
  change(preview){
    let {data,onChange} = this.context;
    let {item} = this.props;
    data[item.field] = preview
    onChange(data)
  }
  onChange(preview,realTime){
    this.setState({preview});
    if(realTime){this.change(preview)}
    else {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(()=>this.change(preview),500);
    }
  }
  
  getStyle(){
    let {theme} = this.context;
    let style = {minHeight:theme.inputHeight}
    if(theme.inputBorderColor){style.border = `1px ${theme.inputBorderType || 'solid'} ${theme.inputBorderColor}`}
    if(theme.inputBorderRadius !== undefined){style.borderRadius = theme.inputBorderRadius;}
    if(theme.inputBG){style.background = theme.inputBG;}
    return style;
  } 
  render(){ 
    let {data,theme} = this.context;
    let {item} = this.props;
    let {preview,prev} = this.state;
    let value = data[item.field] || [];
    if(JSON.stringify(value) !== prev){
      this.setState({preview:value,prev:JSON.stringify(value)})
    }

    return (
      <div className='aio-form-input aio-form-input-list' style={this.getStyle()}>
        {
          preview.map((o,i)=>{
            return (
              <div key={i} style={{height:theme.inputHeight}} className='aio-form-input-list-item'>
                <input disabled={item.disabled} type='text' value={o} onChange={(e)=>{
                  preview[i] = e.target.value;
                  this.onChange(preview);
                }}/>
                <div className='aio-form-input-list-remove' onClick={()=>{
                  preview.pop();
                  this.onChange(preview,true)
                }}>
                  <Icon path={mdiClose} size={0.7}/>
                </div>
              </div>
            ) 
          })
        }
        <div key='add' style={{height:theme.tableRowHeight}} 
          className='aio-form-input-list-add' 
          onClick={()=>{preview.push(''); this.onChange(preview,true);}}
        ><Icon path={mdiPlusThick} size={0.8}/></div>
      </div>
    )
  }
}
class FormDatepicker extends Component{
  static contextType = AIOFormContext;
  onChange(value){
    let {data,onChange} = this.context;
    let {item} = this.props;
    data[item.field] = value
    onChange(data)
  }
  getStyle(){
    let {theme} = this.context;
    let style = {height:theme.inputHeight,minHeight:theme.inputHeight,width:'100%'}
    if(theme.inputPadding !== undefined){style.padding = `0 ${theme.inputPadding}px`;}
    if(theme.inputBorderColor){style.border = `1px ${theme.inputBorderType || 'solid'} ${theme.inputBorderColor}`}
    if(theme.inputBorderRadius !== undefined){style.borderRadius = theme.inputBorderRadius;}
    if(theme.inputBG){style.background = theme.inputBG;}
    return style;
  }
  render(){
    let {item} = this.props;
    let {data} = this.context;
    let value = data[item.field] || [];
    let props = {
      ...item,style:this.getStyle(),className:'aio-form-input aio-form-input-datepicker',
      icon:<><Icon path={mdiCalendarBlankOutline  } size={0.7}/><div style={{width:6}}></div></>
    };
    if(item.type === 'rangedatepicker'){
      props.type = 'range';
      props.start={value:value[0],onChange:({dateString})=>this.onChange([dateString,value[1]])}
      props.end={value:value[1],onChange:({dateString})=>this.onChange([value[0],dateString])}
    }
    else if(item.type === 'datepicker'){
      props.value = value;
      props.onChange = ({dateString})=>this.onChange(dateString)
    }
    return <GAH {...props}/>;
  }
}
class FormSlider extends Component{
  static contextType = AIOFormContext;
  onChange(value){
    let {data,onChange} = this.context;
    let {item} = this.props;
    data[item.field] = value
    onChange(data)
  }
  getSliderStyle(value){
    let {theme} = this.context;
    return {
      lineStyle:()=>{
        return {height:theme.sliderThickness,background:theme.sliderEmptyColor}
      },
      pointStyle:()=>{
        return {background:theme.sliderBTNBG,width:theme.sliderButtonSize,height:theme.sliderButtonSize}
      },
      fillStyle:(index)=>{
        if(value.length === 1 && index === 0){return {background:theme.sliderFillColor || 'dodgerblue',height:theme.sliderThickness}}
        if(value.length === 2 && index === 1){return {background:theme.sliderFillColor || 'dodgerblue',height:theme.sliderThickness}}
      }
    }
  }
  getStyle(){
    let {theme} = this.context;
    let style = {height:theme.inputHeight,minHeight:theme.inputHeight}
    if(theme.inputBorderColor){style.border = `1px ${theme.inputBorderType || 'solid'} ${theme.inputBorderColor}`}
    if(theme.inputBorderRadius !== undefined){style.borderRadius = theme.inputBorderRadius;}
    if(theme.inputBG){style.background = theme.inputBG;}
    if(theme.sliderPadding !== undefined){style.padding = `0 ${theme.sliderPadding}px`}
    return style;
  }
  render(){
    let {item} = this.props;
    let {data,lang} = this.context;
    let {start = 0,end = 100,step = 1,disabled,suffix = ''} = item;
    let value = data[item.field] || [];
    if(!Array.isArray(value)){value = [value];}
    if(item.type === 'rangeslider'){
      if(value.length !== 2 ){value = [0,0]}
    }
    if(item.type === 'slider'){
      if(value.length === 0 ){value = [0]}
    }
    return (
      <div className='aio-form-input aio-form-input-slider' style={this.getStyle()}>
        {
          value.length > 1 &&
          <>
            <div className='aio-form-slider-value'>{value[0] + ' ' + suffix}</div>
            <div style={{width:6}}></div>
          </>
        }
        <Slider
          {...this.getSliderStyle(value)}
          disabled={disabled} start={start} end={end} step={step} points={value}
          showValue={false}
          direction={lang === 'fa'?'left':'right'}
          onChange={(points)=>{
            if(points.length === 1){this.onChange(points[0])}
            else {this.onChange(points)}
          }}
        />  
        <div style={{width:6}}></div>
        <div className='aio-form-slider-value'>{value[1] === undefined?value[0] + ' ' + suffix:value[1] + ' ' + suffix}</div>
      </div>
    )
  }
}
class FormTable extends Component{
  static contextType = AIOFormContext;
  
  onChange(model){
    let {data,onChange} = this.context;
    let {item} = this.props;
    data[item.field] = model;
    onChange(data)
  }
  getAddButton(){
    let {item} = this.props;
    return {
      text:<Icon path={mdiPlusThick} size={0.6}/>,
      onClick:()=>this.add(),
      style:{background:'none',color:'inherit',padding:0},
      disabled:item.disabled
    }
  }
  add(){
    let {item} = this.props;
    let {data} = this.context;
    let model = data[item.field] || [];
    let obj = {};
    for(let i = 0; i < item.columns.length; i++){
      let {field,type,options} = item.columns[i];
      if(field){
        if(field.indexOf('*') !== -1){continue}
        if(field.indexOf('/') !== -1){continue}
        if(field.indexOf('+') !== -1){continue}
        if(field.indexOf('-') !== -1){continue}
      }
      let value;
      if(type === 'text'){value = ''}
      else if(type === 'number'){value = 0}
      else if(type === 'select'){value = options[0].value}
      obj[field] = value;
    }
    model.push(obj); 
    this.onChange(model)
  }
  getToolbarItems(){
    let {item} = this.props;
    let toolbarItems = []
    if(item.addable !== false){
      toolbarItems.push(this.getAddButton())
    }
    return toolbarItems;
  }
  getColumnValue(row,{field}){
    if(field.indexOf('*') !== -1){
      field = field.replaceAll(' ' , '');
      let fields = field.split('*');
      let res = 1;
      for(let i = 0; i < fields.length; i++){
         let a = row[fields[i]];
         if(isNaN(a)){a = 1;}
         res *= a;
      }
      return res
    }
    return row[field]
  }
  getColumns(model){ 
    let {item} = this.props; 
    let {lang} = this.context;
    this.sum = {isSum:true}
    this.isThereSum = false;
    let result = item.columns.map((column)=>{
      if(column.sum){this.isThereSum = true}
      let a = {
        ...column,
        getValue:(row)=>{
          if(row.isSum){return this.sum[column.field]}
          let a = this.getColumnValue(row,column)
          if(column.sum){
            if(row._index === 0){this.sum[column.field] = 0}
            this.sum[column.field] += isNaN(a)?0:a;
          }
          return a;
        }
      }  
      a.before = (row)=>{
        return row.isSum && column.sum?(lang === 'fa'?'مجموع':'Total') + ' : ' : undefined
      }
    if(['text','number','select'].indexOf(column.type) !== -1){
      a.inlineEdit = {
        type:column.type,options:column.options,disabled:column.disabled,
        onChange:(row,val)=>{
          if(!model[row._index]){model[row._index] = {}}
          model[row._index][column.field] = val;
          this.onChange(model)
        }  
      }
      a.inlineEdit.disabled = (row)=>{
        if(column.disabled){return true}
        if(row.isSum){return true}
        if(column.field.indexOf('*') !== -1){return true}
        if(column.field.indexOf('/') !== -1){return true}
        if(column.field.indexOf('+') !== -1){return true}
        if(column.field.indexOf('-') !== -1){return true}
        return false
      }
    }
    return a
  })
    result.push({
      title:'',width:36,
      template:(row)=>{
        if(row.isSum){return ''}
        return <Icon path={mdiClose} size={0.6} onClick={()=>{
          model.splice(row._index,1);
          this.onChange(model)
        }}/>
      }
    })
    return result;
  }
  getStyle(){
    let {theme} = this.context;
    let style = {}
    if(theme.inputBorderColor){style.border = `1px ${theme.inputBorderType || 'solid'} ${theme.inputBorderColor}`; style.background = theme.inputBorderColor}
    if(theme.bodyColor){style.color = theme.bodyColor;}
    if(theme.inputPadding !== undefined){style.padding = `0 ${theme.inputPadding}px`;}
    if(theme.tableMaxHeight !== undefined){style.maxHeight = theme.tableMaxHeight;}
    style.height = 'unset';
    return style;
  }
  getTitleStyle(){
    let {item} = this.props;
    let {theme} = this.context;
    let {titleStyle = {}} = item;
    let style = {boxShadow:'none'};
    style.borderColor = theme.inputBorderColor;
    style.background = theme.tableTitleBackground || theme.inputBG;
    style.color = theme.tableTitleColor;
    return {...style,...titleStyle}

  }
  render(){
    let {item} = this.props;
    let {theme,data,lang} = this.context;
    let model;
    try{model = JSON.parse(JSON.stringify(data[item.field]));}
    catch{model = []}
    if(!model.length){
      return (
        <div 
          className='aio-form-table-add' 
          onClick={()=>this.add()}
          style={{height:theme.inputHeight,border:theme.inputBorderColor?`1px ${theme.inputBorderType || 'solid'} ${theme.inputBorderColor}`:undefined}}
        ><Icon path={mdiPlusThick} size={0.6}/></div>
      )
    }
    let striped;
    let getCellStyle = ()=>{
      let style = {background:theme.inputBG,color:theme.bodyColor};
      return style;
    }
    let toolbarStyle = {height:theme.inputHeight,background:theme.inputBG}
    if(theme.inputBorderColor){toolbarStyle.borderBottom = `1px ${theme.inputBorderType || 'solid'} ${theme.inputBorderColor}`}
    let columns = this.getColumns(model);
    return (
      <Table
        rowGap={1} padding={0} striped={striped} style={this.getStyle()}
        rtl={lang === 'fa'}
        getCellStyle={getCellStyle}
        rowHeight={theme.inputHeight || 36}
        headerHeight={theme.inputHeight || 36}
        titleStyle={this.getTitleStyle()}
        className='aio-form-input aio-form-input-table'
        toolbarStyle={toolbarStyle}
        toolbarItems={this.getToolbarItems()}
        columns={columns}
        model={JSON.parse(JSON.stringify(this.isThereSum?model.concat(this.sum):model))}
      />
    )
  }
}
class FormFile extends Component{
  static contextType = AIOFormContext;
  onChange(files){
    let {data,onChange} = this.context;
    let {item} = this.props;
    data[item.field] = files;
    onChange(data)
  }
  getStyle(){
    let {theme} = this.context;
    let style = {minHeight:theme.inputHeight}
    if(theme.inputBorderColor){style.border = `1px ${theme.inputBorderType || 'solid'} ${theme.inputBorderColor}`}
    if(theme.inputBorderRadius !== undefined){style.borderRadius = theme.inputBorderRadius;}
    if(theme.inputBG){style.background = theme.inputBG;}
    return style;
  }
  render(){
    let {item} = this.props;
    let {data} = this.context;
    let files = data[item.field];
    return (
      <FileManager files={files} style={this.getStyle()} 
        className='aio-form-input aio-form-input-file'
        text={item.text}
        onAdd={(list)=>{
          files = [...files,...list];
          this.onChange(files)
        }} 
        onRemove={(index)=>{
          files.splice(index,1);
          this.onChange(files)
        }}
      />
    )
  }
}
class FormColor extends Component{
  static contextType = AIOFormContext;
  onChange(files){
    let {data,onChange} = this.context;
    let {item} = this.props;
    data[item.field] = files;
    onChange(data)
  }
  getStyle(value){
    let {theme} = this.context;
    let style = {height:theme.inputHeight,minHeight:theme.inputHeight}
    if(theme.inputPadding !== undefined){style.padding = `0 ${theme.inputPadding}px`}
    if(theme.inputBorderColor){style.border = `1px ${theme.inputBorderType || 'solid'} ${theme.inputBorderColor}`}
    style.background = value;
    style.color = '#fff';
    style.borderRadius = theme.inputBorderRadius;
    return style;
  }
  render(){
    let {data} = this.context;
    let {item} = this.props;
    let value = data[item.field];
    return (
      <label className='aio-form-input aio-form-input-color' style={this.getStyle(value)}>
        <input type='color' value={value}  onChange={(e)=>this.onChange(e.target.value)}/>
        {value}
        </label>
    )
  }
}

class FileManager extends Component{
    render(){
        let {files = [],onAdd,onRemove,className,text,color,style} = this.props;
        let Previews = [];
        for(let i = 0; i < files.length; i++){
            let file = files[i];
            Previews.push(<FilePreview key={i} index={i} file={file} onRemove={onRemove} color={color}/>)
        }
        return (
          <div className={'file-manager' + (className?' ' + className:'')} style={style}>
            {onAdd && <AddFile onAdd={(list)=>onAdd(list)} text={text} color={color}/>}
            {Previews}
          </div>
        );
    }
}
class FilePreview extends Component{
    constructor(props){
      super(props);
      this.state = {preview:false}
    }
    getFile(file){
        let minName,sizeString;
        let lastDotIndex = file.name.lastIndexOf('.');
        let name = file.name.slice(0,lastDotIndex);
        let format = file.name.slice(lastDotIndex + 1,file.name.length);
        if(name.length > 10 + 5){
            minName = name.slice(0,10) + '...' + name.slice(10,10 + 5) + '.' + format;
        }
        else{minName = file.name;}
        let size = file.size;
        let gb = size / (1024 * 1024 * 1024),mb = size / (1024 * 1024),kb = size / 1024;
        if(gb >= 1){sizeString = gb.toFixed(2) + ' GB';}
        else if(mb >= 1){sizeString = mb.toFixed(2) + ' MB';}
        else if(kb >= 1){sizeString = kb.toFixed(2) + ' KB';}
        else {sizeString = size + ' byte'}
        return {minName,sizeString}
    }
    getIcon(file,size){
      return <Icon style={{width:size,height:size}} path={mdiAttachment} size={1} onClick={()=>this.setState({preview:file})}/>
    }
    render(){
        let {file,onRemove,index,color,size = 36} = this.props;
        let {preview} = this.state;
        let {sizeString,minName} = this.getFile(file);
        return (
            <>
            <RVD
                layout={{
                    attrs:{className:'file-preview',style:{background:color,height:size}},
                    flex:'none',
                    row:[
                        {size,html:this.getIcon(file,size),align:'vh',attrs:{style:{overflow:'hidden'}}},
                        {
                            column:[
                                {align:'v',flex:1,html:minName,attrs:{className:'file-preview-name'}},
                                {aling:'v',flex:0.8,html:sizeString,attrs:{className:'file-preview-size'}},
                            ]
                        },
                        {
                            show:onRemove !== undefined,size,html:<Icon path={mdiClose} size={0.7}/>,align:'vh',
                            attrs:{onClick:()=>onRemove(index)}
                        },
                        {show:onRemove === undefined,size:12} 
                    ]
                }}
            />
            {
              preview && 
              <div className='file-preview-preview' onClick={()=>this.setState({preview:false})}>
                <embed type={preview.type} src={URL.createObjectURL(preview)} width='90%' height={'90%'} style={{pointerEvent:'none'}}/>
              </div>
            }
            </>
        )
    }
}
class AddFile extends Component{
    async toBase64(file){
        let a = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
        return a;
    }
    change(e){
        let {onAdd} = this.props;
        onAdd(e.target.files);
    }
    render(){
        let {text = 'Add File',color} = this.props;
        return (
            <label className='add-file' style={{color}}>
                <input type='file' onChange={(e)=>this.change(e)} multiple/>  
                <div className='add-file-icon'><Icon path={mdiPlusThick} size={0.8}/></div>
                <div className='add-file-text'>{text}</div>
            </label>
        )
    }
}