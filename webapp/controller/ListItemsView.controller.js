sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"app/splitappb12/model/models",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Filter"
], (Controller,models,Filter,FilterOperator) => {
    "use strict";

    return Controller.extend("app.splitappb12.controller.ListItemsView", {
        onInit() {
        },
        onItemPress:function(oControlEvent){
			var item=oControlEvent.getParameter("listItem");
			var sPath=item.oBindingContexts.toolModel.sPath;
			let aItems=sPath.split("/")
            let sIndex=aItems[aItems.length-1]
            let oRouter=this.getOwnerComponent().getRouter()
            oRouter.navTo("RouteDetail",{
                ind:sIndex
            })

            // var mainPath="toolModel>" +sPath;
			// var oApp=this.getView().getParent().getParent();			
			// var oView2=oApp.getDetailPage("idDetail");
			// oView2.bindElement(mainPath);
			//this.onPressToView2();
			//oApp.getPages()
		},
		
		onSort:function(){
		
			if(this.descending==="undefined"){
				this.descending=false;
			}
			
			var sorter=new sap.ui.model.Sorter("name", this.descending);
			var oList=this.getView().byId("idListItem");
			var oBinding=oList.getBinding("items");
			oBinding.sort(sorter);
			this.descending=!this.descending;
			//this.descending=true; (for once flipping)
			
		},
		
		onSearch:function(oEvent){
			//	var searchST=this.getView().byId("idSearch");
		var searchString=oEvent.getParameter("query") || oEvent.getParameter("newValue");
		var filter1= new Filter("name", FilterOperator.Contains,searchString);
		var filter2= new Filter("id", FilterOperator.Contains, searchString );
		
		var aFilter=[filter1,filter2];
		var mainFilter=new Filter({
			filters:aFilter,
			and:false
		});
		var oList=this.getView().byId("idListItem");
		var bindingItems=oList.getBinding("items");
		bindingItems.filter(mainFilter);
		},
		
		
		onPressToView2:function(){
			var oApp=this.getView().getParent().getParent();
			oApp.to("idDetail");
		}
    });
});