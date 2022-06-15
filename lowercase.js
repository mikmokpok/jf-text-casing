//initialize widget
JFCustomWidgetUtils.domReady(function() {
class LowerCase{
    params;
    input = document.querySelector('#lowercase');
    messageEl = document.querySelector('#message');
    button = document.querySelector('#convert');
    srcVal;
    tarVal;

    constructor(){
        this.params = JFCustomWidget.getWidgetSettings();
        this.updateValue();
        this.button.addEventListener('click', ()=>{
            this.updateValue();
        });
    }

     updateValue = async ()=>{
       this.srcVal = await this.getFields();
       
        this.tarVal = this.srcVal.toLowerCase();
        this.input.value = this.tarVal;
         return this.tarVal;
     }

     getFields = ()=>{
        return new Promise((resolve, reject)=>{
          JFCustomWidget.getFieldsValueByName([this.params.srcId], n=>resolve(n.data[0].value));
        });
     }

    resizeWidget() {
        var height = document.getElementsByTagName('body')[0].clientHeight || 94;
        if (JFCustomWidget.isFromCardform() && height < 94) {
          height = 94;
        }
        JFCustomWidget.requestFrameResize({
          height: height
        });
      }

      getData(){
        return {
            valid: !!this.tarVal,
            value: this.tarVal
          };
      }


    }
    
JFCustomWidget.subscribe('ready', function(data) {
    var widget = new LowerCase(data);
    // JFCustomWidget.subscribe("submit", function() {
    //   JFCustomWidget.sendSubmit(widget.getData());
    // });

    // JFCustomWidget.subscribe('show', function() {
    //   widget.resizeWidget();
    // });
  });
});








// const widgetField = document.querySelector('[data-type="widget-lowercase"]');

// widgetField.addEventListener('change', (e)=>{console.log(e.target.value)});


// //get data from field
// const srcField = document.querySelector(`${params.srcId}`);

// //lowercase it
// widgetField.value = srcField.value.toLowerCase();
// //display it
//