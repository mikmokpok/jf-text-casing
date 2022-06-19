JFCustomWidgetUtils.domReady(function () {
  class LowerCase {
    params;
    input = document.querySelector("#lowercase");
    messageEl = document.querySelector("#message");
    fieldObj;
    tarVal;
    constructor() {
      this.params = JFCustomWidget.getWidgetSettings();
      this.params.srcId
        ? (this.params.srcId = this.params.srcId.substring(1))
        : this.showError("Field ID must be specified.");
      this.updateValue();
      JFCustomWidget.listenFromField(this.params.srcId, "change", (res) => {
        this.updateValue();
      });
    }
    updateValue = async () => {
      this.fieldObj = await this.getFields();
      if(this.fieldObj.data[0].type){
        switch (this.params.format) {
          case "Lowercase":
            this.tarVal = this.fieldObj.data[0].value.toLowerCase();
            break;
          case "Uppercase":
            this.tarVal = this.fieldObj.data[0].value.toUpperCase();
            break;
          case "Proper Case":
            this.tarVal = this.toTitleCase(this.fieldObj.data[0].value);
            break;
        }
        this.params.trim == "Yes" && (this.tarVal = this.tarVal.trim());
        this.input.value = this.tarVal;
        JFCustomWidget.sendData({
          value: this.tarVal,
        });
        return this.tarVal;
      }else{
        this.showError('Invalid source field ID.');
      }
    };
    getFields = () => {
      return new Promise((resolve, reject) => {
        JFCustomWidget.getFieldsValueById(
          [this.params.srcId.split("_")[1] || 'error'],
          (n) => resolve(n)
        );
      });
    };
    toTitleCase(str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
    resizeWidget() {
      var height = document.getElementsByTagName("body")[0].clientHeight || 94;
      if (JFCustomWidget.isFromCardform() && height < 94) {
        height = 94;
      }
      JFCustomWidget.requestFrameResize({
        height: height,
      });
    }
    showError(error) {
      this.input.style.display = "none";
      this.messageEl.innerHTML = error;
    }
    getData() {
      return {
        valid: !!this.tarVal,
        value: this.tarVal,
      };
    }
  }
  JFCustomWidget.subscribe("ready", function (data) {
    var widget = new LowerCase(data);
    JFCustomWidget.subscribe("submit", function () {
      JFCustomWidget.sendSubmit(widget.getData());
    });
    JFCustomWidget.subscribe("show", function () {
      widget.resizeWidget();
    });
  });
});
