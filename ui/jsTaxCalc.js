function fNumber(n) 
{
/*	//alert(n);
	if (n==250000)
		//alert(n);
	n=stripNonDigits(n);*/
	s=stripComma(n);
	//alert("External script function triggered with parameter: "+s + " Length"+s.length);
	m="";
	m=s.substr(0,1);
	if (m !="-")
		m="";
	else
		s=s.substr(1);
	switch (s.length)
	{
		case 4:
			s=s.substr(0,1) +","+s.substr(1);
			break;
		case 5:
			s=s.substr(0,2) +","+s.substr(2);
			break;
		case 6:
			s=s.substr(0,1) +","+s.substr(1,2)+","+s.substr(3);
			break;
		case 7:
			s=s.substr(0,2) +","+s.substr(2,2)+","+s.substr(4);
			break;
		case 8:
			s=s.substr(0,1) +","+s.substr(1,2)+","+s.substr(3,2)+","+s.substr(5);
			break;	
		case 9:
			s=s.substr(0,2) +","+s.substr(2,2)+","+s.substr(4,2)+","+s.substr(6);
			break;	
		case 10:
			s=s.substr(0,1) +","+s.substr(1,2)+","+s.substr(3,2)+","+s.substr(5,2)+","+s.substr(7);
			break;														
	}
		//alert("returning formated Number " + m+s);
		return(m+s);
}
function stripComma(n)
{
	//alert("Inside stripComma function, Parameter valaue: x"+n+"x");
try
	{
		n=n.toString();
		n=n.trim();
		s="";
		
		for(j=0;j<n.length;j++)
		{
			switch(n.substr(j,1)){
				case '0':
				case '1':
				case '2':
				case '3':
				case '4':
				case '5':
				case '6':
				case '7':
				case '8':
				case '9':
				case '-':
				case '.':
					s=s + n.substr(j,1);
					break;
			}
		}
		//alert("returning stripComma function, Return valaue: " + n + " -> " +s);
		return(s);
	}
	catch (e)
	{
		alert(e.getMessage());
	}
}
	function setValue(ElementID, Newvalue){
		//document.getElementById("S3").value=getValue("S1")+getValue("S2");
		//alert("Setting Value for " +ElementID + " : "+Newvalue);
		document.getElementById(ElementID).value= fNumber(Newvalue.toString());
		//document.all.sal1.innerHTML  =Newvalue;
	}
	function GetValue(ElementID){
		//alert("Get Value of : "+ ElementID + "="+(document.getElementById(ElementID).value));
		//return(Val(stripComma(document.getElementById(ElementID).value)));
		//alert("Get Value of : "+ ElementID + "="+(document.getElementById(ElementID).value));
		if (document.getElementById(ElementID)!==null)
		{

if (document.getElementById(ElementID).value !==null && document.getElementById(ElementID).value !=='')
					return(parseInt(stripComma(document.getElementById(ElementID).value)));
			else
			{
				return 0;	
			}
		}
		else
		{
			alert("Element '"+ElementID +"' not found in the scope!");
			return 0;
		}
	}	
function computeTax()
{
	Income=GetValue;
	//alert(Income);
	a10=500000;	a20=0;	a30=0;
	t10=0;	t20=0;	t30=0;
	tax=0; cess=0;

	if (Income>500000)
		rR=0;
	else
		rR=5000;
		//alert("Getting Category" + document.getElementById("cbCategory").value);
	switch (GetValue("cbCategory"))
	{
		case 2:
			NilLimit=300000;
			break;
		case 3:
			NilLimit=500000;
			break;
		default:
			NilLimit=250000;
	}
	
		if (Income>NilLimit)
		{
			Income-=NilLimit;
			t10=500000-NilLimit;
			if (Income>t10)
			{
				a10=t10; //Income-(l10)
				Income-=t10;
				if (Income>500000) //l20'
				{
					a20=500000;
					Income-=a20;
					if (Income>0)
						a30=Income;
				}	
				else
					a20=Income; 
			}	
			else{
				a10=Income;
				}
				
				t10=(a10*10)/100;
				t20=(a20*20)/100;
				t30=(a30*30)/100;
				tax=t10+t20+t30;
				tax=Math.round(tax);
				setValue("TxtTax",	tax);
				
				if (rR>0)
				{
					if (tax>rR)
					{
						
						tax-=rR;
						//alert(rR +" - " + tax);
					}
					else{
						tax=0;
						sc=0;
						}
				}
				//alert("Rebate "+rR);
				cess=(tax*2)/100;
				cess+=(tax*1)/100;
				cess=Math.round(cess);
				setValue("TxtRebate",rR);
				setValue("TxtCess", cess);
				tax+=cess;
				setValue("TxtNetTax",tax);
			 if(tax<=0)
			 	Remarks="Upto Rs. " + fNumber(NilLimit) + " > Tax Nil!";
			 else
			 	Remarks="Upto Rs. " + fNumber(NilLimit) + " > NIL, "+ fNumber(a10) + " @ 10% = " + fNumber(t10);
			 if (t20>0){
			 	Remarks+=" | "+ fNumber(a20) + " @ 20% = " + fNumber(t20);
		 		document.getElementById("InnerBox").style.height="350px";
			 }
			 else{
			 	document.getElementById("InnerBox").style.height="320px";
			 }			 	
			 if (t30>0)
			 	Remarks+=" <br> "+ fNumber(a30) + " @ 30% = " + fNumber(t30);
			 	
			 if (cess>0)
			 	 Remarks+="<br> Cess ="+ cess + ", Total = "+document.getElementById("TxtNetTax").value + "/-";	
			 if (rR>0)
			 	 Remarks+="<br> Rebate Applicable ="+ fNumber(rR);
			 	 
			 	  Remarks+=", Total = "+document.getElementById("TxtNetTax").value + "/-";	
	}
		else
		{
			Remarks="Upto Rs. " + fNumber(NilLimit) + " > Tax Nil!";
			setValue("TxtTax",	0);
			setValue("TxtNetTax",0)
			setValue("TxtRebate",0);
			setValue("TxtCess", 0);
			setValue("TxtNetTax",0);			
		}
		//alert("0. Compute Tax "+tax);
		//alert("1. Compute Tax "+ fNumber(a10) + " @ " + fNumber(p10) + "% = " + fNumber(t10));
		//alert("2. Compute Tax "+ fNumber(a20) + " @ " + fNumber(p20) + "% = " + fNumber(t20));
		//alert("3. Compute Tax "+ fNumber(a30) + " @ " + fNumber(p30) + "% = " + fNumber(t30));
		//alert ("1. Compute Tax : Upto Rs. " + fNumber(nl) + " > NIL, ");
		//Upto Rs. 2,50,000 > NIL, 2,50,000 @ 10% = 25,000, 67,850 @ 20% = 13,570, Total = 39,727/-
		//alert ("computeTax: Upto Rs. " + fNumber(nl) + " > NIL, "+ fNumber(a10) + " @ " + fNumber(p10) + "% = " + fNumber(t10)+" | "+ fNumber(a20) + " @ " + fNumber(p20) + "% = " + fNumber(t20)+" | "+ fNumber(a30) + " @ " + fNumber(p30) + "% = " + fNumber(t30) + ", Cess ="+ cess + ", Total = "+GetString("TTP") + "/-");

		 
		 document.getElementById("Remarks").innerHTML=Remarks;
}
function ResetText()	
{
			setValue("TxtTax",	0);
			setValue("TxtNetTax",0)
			setValue("TxtRebate",0);
			setValue("TxtCess", 0);
			setValue("TxtNetTax",0);
			setValue("TxtIncome",0);
			document.getElementById("TxtIncome").focus();
			 document.getElementById("Remarks").innerHTML="";
			 document.getElementById("InnerBox").style.height="320px"
}
