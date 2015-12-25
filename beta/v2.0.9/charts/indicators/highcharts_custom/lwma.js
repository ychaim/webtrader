define(["indicator_base","highstock"],function(a){function b(b){if(b.index<b.period-1)return null;for(var c=0,d=0,e=0;e<b.period;e++)c+=a.getPrice(b.data,b.index-e,b.appliedTo,b.type)*(b.index-e),d+=b.index-e;return c/d}var c={},d={};return{init:function(){!function(a,e,f){function g(a,e){{var g=this;g.chart}for(var h in d)if(d[h]&&d[h].options&&d[h].options.data&&d[h].options.data.length>0&&c[h].parentSeriesID===g.options.id){var i=g.options.data,j=c[h],k=f.findIndexInDataForTime(i,a);if(k>=1){var l={data:i,index:k,period:j.period,type:this.options.type,appliedTo:j.appliedTo},m=b(l);e?d[h].data[k].update({y:f.toFixed(m,4)}):d[h].addPoint([i[k].x||i[k][0],f.toFixed(m,4)],!0,!0,!1)}}}a&&!a.Series.prototype.addLWMA&&(a.Series.prototype.addLWMA=function(a){var g=this.options.id;a=e.extend({period:20,appliedTo:f.CLOSE,strokeColor:"red",strokeWidth:1,dashStyle:"line",parentSeriesID:g},a);var h="_"+(new Date).getTime(),i=this.options.data||[];if(i&&i.length>0){for(var j=[],k=0;k<i.length;k++){var l={data:i,index:k,period:a.period,type:this.options.type,appliedTo:a.appliedTo},m=b(l);j.push([i[k][0]||i[k].x,f.toFixed(m,4)])}var n=this.chart;c[h]=a;var o=this;d[h]=n.addSeries({id:h,name:"LWMA ("+a.period+", "+f.appliedPriceString(a.appliedTo)+")",data:j,type:"line",dataGrouping:o.options.dataGrouping,opposite:o.options.opposite,color:a.strokeColor,lineWidth:a.strokeWidth,dashStyle:a.dashStyle,compare:o.options.compare},!1,!1),e(d[h]).data({onChartIndicator:!0,indicatorID:"lwma",isIndicator:!0,parentSeriesID:a.parentSeriesID}),n.redraw()}},a.Series.prototype.removeLWMA=function(a){var b=this.chart;c[a]=null,b.get(a).remove(!1),d[a]=null,b.redraw()},a.Series.prototype.preRemovalCheckLWMA=function(a){return{isMainIndicator:!0,isValidUniqueID:null!=c[a]}},a.wrap(a.Series.prototype,"addPoint",function(a,b,d,e,h){a.call(this,b,d,e,h),f.checkCurrentSeriesHasIndicator(c,this.options.id)&&g.call(this,b[0])}),a.wrap(a.Point.prototype,"update",function(a,b,d,e){a.call(this,b,d,e),f.checkCurrentSeriesHasIndicator(c,this.series.options.id)&&g.call(this.series,this.x,!0)}))}(Highcharts,jQuery,a)}}});