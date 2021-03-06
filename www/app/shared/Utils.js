angular.module('utilities', [])

.factory('Utils', function() {
	return {
		formatIndianRupee: function(x) {
	      if(isNaN(x)) {
	        return "0.00";
	      }

	      x=x.toString();
	      var afterPoint = '';
	      if(x.indexOf('.') > 0) {
	        afterPoint = x.substring(x.indexOf('.'),x.length);
	      }
	      x = Math.floor(x);
	      x=x.toString();
	      var lastThree = x.substring(x.length-3);
	      var otherNumbers = x.substring(0,x.length-3);
	      if(otherNumbers != '')
	          lastThree = ',' + lastThree;
	      var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
	      return res;
	    },
	    arrayUnique: function (array) {
		    var a = array.concat();
		    for(var i=0; i<a.length; ++i) {
		        for(var j=i+1; j<a.length; ++j) {
		            if(a[i] === a[j])
		                a.splice(j--, 1);
		        }
		    }

		    return a;
		}
	}
});