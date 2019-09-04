//hello World
//gogogo
//mydear oh my god
var ub, vb, ab, sb, tb;     //boolean value of weather the item have input or not
var u, v, a, s, t;          //the number value of input
var showing=false;
$("#resetbtn").on("click", reset);
function get(need_value_update){
    ub=  $("#u").val() !="";
    vb=  $("#v").val() !="";
    ab=  $("#a").val() !="";
    sb=  $("#s").val() !="";
    tb=  $("#t").val() !="";
    if(need_value_update){
        u=  Number($("#u").val());
        v=  Number($("#v").val());
        a=  Number($("#a").val());
        s=  Number($("#s").val());
        t=  Number($("#t").val());
    }
}
function Num(num){
    return (num>=0)? num: "("+num+")";
}
function display(){
    $("#solution").fadeOut(1000);
    $("#off").hide();
}
function reset(){
    $("#u").val("");
    $("#v").val("");
    $("#a").val("");
    $("#s").val("");
    $("#t").val("");
    checking();
}
function adjust(x,y){
    if(x==1){
        $("#Ans1").css("visibility", "visible")
        switch(y){
            case "uu":
                $("#uu").css("visibility", "hidden")
                $("#Ans1").html("Initial velocity");
                $("#unit1").html("ms<sup>-1</sup>");
                break;
            case "vv":
                $("#vv").css("visibility", "hidden");
                $("#Ans1").html("Final velocity");
                $("#unit1").html("ms<sup>-1</sup>");
                break;
            case "aa":
                $("#aa").css("visibility", "hidden");
                $("#Ans1").html("Acceleration");
                $("#unit1").html("ms<sup>-2</sup>");
                break;
            case "ss":
                $("#ss").css("visibility", "hidden");
                $("#Ans1").html("Displacement");
                $("#unit1").html("m");
                break;
            default:
                break;
        }
    }
    else if(x==2){
        $("#Ans2").css("visibility","visible")
        switch(y){
            case "vv":
                $("#vv").css("visibility", "hidden");
                $("#Ans2").html("Final velocity");
                $("#unit2").html("ms<sup>-1</sup>");
                break;
            case "aa":
                $("#aa").css("visibility", "hidden");
                $("#Ans2").html("Acceleration");
                $("#unit2").html("ms<sup>-2</sup>");
                break;
            case "ss":
                $("#ss").css("visibility", "hidden");
                $("#Ans2").html("Displacement");
                $("#unit2").html("m");
                break;
            case "tt":
                $("#tt").css("visibility", "hidden");
                $("#Ans2").html("Time");
                $("#unit2").html("s");
                break;
            default:
                break;
        }
    }
    else{
        alert("this programme have bug");
    }
}
function checking(){
    get(false);
    var count = 0;
    if(ub) {count++;}
    if(vb) {count++;}
    if(ab) {count++;}
    if(sb) {count++;}
    if(tb) {count++;}

    if(count==1){
        $("#p_bar").css("width", "33.3%");
        $("#p_bar").html("1/3 values entered");
    }
    if(count==3){
        $("#p_bar").css("width", "100%");
        $("#p_bar").html("3/3 values entered");
        $("#off").show();
        motion();
    }
    if(count==2 || count==0){
        if(count==0){
            $("#p_bar").css("width", "1%");
            $("#p_bar").html("0%");
        }
        if(count==2){
            $("#p_bar").css("width", "66.6%");
            $("#p_bar").html("2/3 values entered");
        }
        $("#off").html("Show Step");
        document.getElementById("off").onclick=showStep;
        showing=false;
        $("#off, #solution").hide();
        $("#uu, #vv, #aa, #ss, #tt").css("visibility", "visible");
        $("#Ans1, #Ans2").css("visibility", "hidden");
        $("#Ans1content, #Ans2content").attr("placeholder", "");
        $("#unit1, #unit2").html("");
    }
}
function motion(){
    get(true);
    if (ub && vb && ab && !sb && !tb) {
        //uva
        //v^2 = u^2 +2as
        adjust(1,'ss');
        s = (v*v-u*u)/(2*a)
        $("#Ans1content").attr("placeholder",s);
        //v=u+at
        adjust(2,'tt');
        t = ( v-u ) / a;
        $("#Ans2content").attr("placeholder",t);
    }
    else if (ub && vb && !ab && sb && !tb) {
        //uvs
        //v^2 = u^2 +2as
        adjust(1,'aa');
        a=(v*v-u*u)/(2*s);
        $("#Ans1content").attr("placeholder",a);
        //s = (u+v)*t/2
        adjust(2,'tt');
        t=(2*s) / ( v+u );
        $("#Ans2content").attr("placeholder",t);
    }
    else if (ub && vb && !ab && !sb && tb) {
        //uvt
        //v=u+at
        adjust(1,'aa');
        a=( v-u ) / t;
        $("#Ans1content").attr("placeholder",a);
        //s = (u+v)*t/2
        adjust(2,'ss');
        s=( u+v )*t/2;
        $("#Ans2content").attr("placeholder",s);
    }
    else if (ub && !vb && ab && sb && !tb) {
        //uas
        //v^2 = u^2 +2as
        adjust(1,'vv');
        v= Math.sqrt((u*u)+(2*a*s));
        $("#Ans1content").attr("placeholder",v);
        //s=ut+0.5*at^2
        var x = (-1*u + Math.sqrt(u*u-4*0.5*a*-1*s))/(2*0.5*a);
        var y = (-1*u - Math.sqrt(u*u-4*0.5*a*-1*s))/(2*0.5*a);
        adjust(2,'tt');
        t=(x>=0)?x:y;
        $("#Ans2content").attr("placeholder",t);
    }
    else if (ub && !vb && ab && !sb && tb) {
        //uat
        //v=u+at
        adjust(1,'vv');
        v=u+(a*t);
        $("#Ans1content").attr("placeholder",v);
        //s=ut+0.5*at^2
        adjust(2,'ss');
        s=u*t+0.5*a*t*t;
        $("#Ans2content").attr("placeholder",s);
    }
    else if (ub && !vb && !ab && sb && tb) {
        //ust
        //s = (u+v)*t/2
        adjust(1,'vv');
        v= (s*2/t)-u;
        $("#Ans1content").attr("placeholder",v);
        //s=ut+0.5*at^2
        adjust(2,'aa');
        a=(s-u*t)/(0.5*t*t);
        $("#Ans2content").attr("placeholder",a);
    }
    else if (!ub && v && ab && sb && !tb) {
        //vas
        //v^2 = u^2 +2as
        u = Math.sqrt(v*v-2*a*s);
        adjust(1,'uu');
        u=Math.sqrt(v*v-2*a*s);
        $("#Ans1content").attr("placeholder",u);
        //s = (u+v)*t/2
        adjust(2,'tt');
        t= (s*2)/(u+v);
        $("#Ans2content").attr("placeholder",t);
    }
    else if (!ub && vb && ab && !sb && tb) {
        //vat
        //v=u+at
        adjust(1,'uu');
        u=v-a*t
        $("#Ans1content").attr("placeholder",u);
        //s = (u+v)*t/2
        adjust(2,'ss');
        s=(u+v)*t/2;
        $("#Ans2content").attr("placeholder",s);
    }
    else if (!ub && vb && !ab && sb && tb) {
        //vst
        //s = (u+v)*t/2
        adjust(1,'uu');
        u =  s*2/t - v;
        $("#Ans1content").attr("placeholder",u);
        //v=u+at
        adjust(2,'aa');
        a= (v-u)/t;
        $("#Ans2content").attr("placeholder",a);
    }
    else if (!ub && !vb && ab && sb && tb) {
        //ast
        //s=ut+0.5*at^2
        adjust(1,'uu');
        u = (s-0.5*a*t*t)/t;
        $("#Ans1content").attr("placeholder",u);
        //v=u+at
        adjust(2,'vv');
        v= u+a*t;
        $("#Ans2content").attr("placeholder",v);
    }
    if(showing){
        showStep();
    }
}
function hideStep(){
    $("#solution").fadeOut(1000);
    $("#off").html("Show Step");
    document.getElementById("off").onclick= showStep;
    showing=false;
}
function showStep(){
    get(false);
    showing=true;
    $("#solution").fadeIn(1000);

    if($("#off").html()=="Show Step"){
        $("#off").html("Hide Step");
        document.getElementById("off").onclick= hideStep;
    }
    var v2u = '$$v^2 = u^2 + 2as$$';
    var sut = '$$s = ut + {1\\over2}at^2$$';
    var vua = '$$v=u+at$$';
    var suv = '$$s={(u+v)t\\over2}$$';

    if (ub && vb && ab && !sb && !tb) {
        $("#solution").html("<h3>Step 1: Assign values to variables:</h3>");
        $("#solution").append("Initial velocity: u = "+u+" ms<sup>-1</sup><br/>");
        $("#solution").append("Final velocity: v = "+v+" ms<sup>-1</sup><br/>");
        $("#solution").append("Acceleration: a = "+a+" ms<sup>-2</sup><p/><hr/>");
        $("#solution").append("<h3>Step 2. Use equations:</h3><br/>");
        $("#solution").append("For Displacement:<br/>");
        $("#solution").append(v2u)
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("Change of subject and put in value");
        $("#solution").append("$$s={v^2-u^2\\over2a}$$")
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("$$s={"+Num(v)+"^2-"+Num(u)+"^2\\over2("+a+")}="+s+" m$$")
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("For Time:<br/>");
        $("#solution").append(vua)
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("Change of subject and put in value");
        $("#solution").append("$$t={v-u\\over{a}}$$")
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("$$t={{"+v+"-"+Num(u)+"\\over{"+a+"}}="+t+"s}$$")
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    }
    else if (ub && vb && !ab && sb && !tb) {
        $("#solution").html("<h3>Step 1: Assign values to variables:</h3>");
        $("#solution").append("Initial velocity: u = "+u+" ms<sup>-1</sup><br/>");
        $("#solution").append("Final velocity: v = "+v+" ms<sup>-1</sup><br/>");
        $("#solution").append("Displacement: s = "+s+" m<p/><hr/>");
        $("#solution").append("<h3>Step 2. Use equations:</h3><br/>");
        $("#solution").append("For Acceleration:<br/>");
        $("#solution").append(v2u);
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("Change of subject and put in value");
        $("#solution").append("$$a={v^2-u^2\\over2s}$$")
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("$$a={"+Num(v)+"^2-"+Num(u)+"^2\\over2("+s+")}="+a+" ms^{-2}$$")
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("For Time:<br/>");
        $("#solution").append(sut);
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("Change of subject and put in value");
        $("#solution").append("$$t={2s\\over{v+u}}$$")
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("$$t={2("+s+")\\over{"+v+"+"+Num(u)+"}}="+t+"s$$")
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    }
    else if (ub && vb && !ab && !sb && tb) {
       $("#solution").html("<h3>Step 1: Assign values to variables:</h3>");
       $("#solution").append("Initial velocity: u = "+u+" ms<sup>-1</sup><br/>");
       $("#solution").append("Final velocity: v = "+v+" ms<sup>-1</sup><br/>");
       $("#solution").append("Time: t = "+t+" s<p/><hr/>");
       $("#solution").append("<h3>Step 2. Use equations:</h3><br/>");
       $("#solution").append("For Acceleration:<br/>");
       $("#solution").append(vua)
           MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
       $("#solution").append("Change of subject and put in value");
       $("#solution").append("$$a={{v-u}\\over t}$$")
           MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
       $("#solution").append("$$a={{"+v+"-"+Num(u)+"}\\over "+t+"}="+a+"ms^{-2}$$")
           MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
       $("#solution").append("For Displacement:<br/>");
       $("#solution").append(sut)
           MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
       $("#solution").append("Change of subject and put in value");
       $("#solution").append("$$s={(u+v)t\\over2}$$")
           MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
       $("#solution").append("$$s={("+u+"+"+Num(v)+")\\times"+t+"\\over2}="+s+"m$$")
           MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    }
    else if (ub && !vb && ab && sb && !tb) {
        $("#solution").html("<h3>Step 1: Assign values to variables:</h3>");
        $("#solution").append("Initial velocity: u = "+u+" ms<sup>-1</sup><br/>");
        $("#solution").append("Acceleration: a = "+a+" ms<sup>-2</sup><br/>");
        $("#solution").append("Displacement: s = "+s+" m<p/><hr/>");
        $("#solution").append("<h3>Step 2. Use equations:</h3><br/>");
        $("#solution").append("For Final Velocity:<br/>");
        $("#solution").append(v2u)
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("Change of subject and put in value");
        $("#solution").append("$$v={\\sqrt{u^2+2as}}$$")
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("$$v={\\sqrt{"+u+"^2+2("+a+")("+s+")}}="+v+"ms^{-1}$$")
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("For Time:<br/>");
        $("#solution").append(sut);
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("Change of subject and put in value");
        $("#solution").append("$$t = {-u \\pm \\sqrt{u^2-4({1\\over2}a)(-s))} \\over 2({1\\over2}a)}$$")
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("$$t = {-"+Num(u)+" \\pm \\sqrt{"+Num(u)+"^2-4({1\\over2} \\times"+Num(a)+")(-"+Num(s)+"))} \\over 2({1\\over2} \\times "+Num(a)+")}="+t+"s (rej \\le 0 )$$")
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    }
    else if (ub && !vb && ab && !sb && tb) {
        $("#solution").html("<h3>Step 1: Assign values to variables:</h3>");
        $("#solution").append("Initial velocity: u = "+u+" ms<sup>-1</sup><br/>");
        $("#solution").append("Time: t = "+t+" s<br/>");
        $("#solution").append("Acceleration: a = "+a+" ms<sup>-2</sup><p/><hr/>");
        $("#solution").append("<h3>Step 2. Use equations:</h3><br/>");
        $("#solution").append("For Final velocity:<br/>");
        $("#solution").append(vua)
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("Change of subject and put in value");
        $("#solution").append("$$v=u+at$$")
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("$$v="+u+"+"+Num(a)+"("+t+")="+v+"ms^{-1}$$")
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("For Displacement:<br/>");
        $("#solution").append(sut)
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("Change of subject and put in value");
        $("#solution").append("$$s = ut + {1\\over2}at^2$$")
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("$$s = "+Num(u)+"("+t+") + {1\\over2}("+a+")("+t+")^2="+s+"m$$")
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    }
    else if (ub && !vb && !ab && sb && tb) {
        $("#solution").html("<h3>Step 1: Assign values to variables:</h3>");
        $("#solution").append("Initial velocity: u = "+u+" ms<sup>-1</sup><br/>");
        $("#solution").append("Displacement: s = "+s+" m<br/>");
        $("#solution").append("Time: t = "+t+" s<p/><hr/>");
        $("#solution").append("<h3>Step 2. Use equations:</h3><br/>");
        $("#solution").append("For Final Velocity:<br/>");
        $("#solution").append(suv)
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("Change of subject and put in value");
        $("#solution").append("$$v={2s\\over{t}}-u$$");
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("$$v={2("+s+")\\over{"+t+"}}-"+Num(u)+"="+v+"ms^{-1}$$")
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("For Acceleration:<br/>");
        $("#solution").append(sut)
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("Change of subject and put in value");
        $("#solution").append("$$a ={ s-ut \\over {{1\\over2}t^2}}$$")
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("$$a ={ "+Num(s)+"-"+Num(u)+"("+t+") \\over {{1\\over2}("+t+")^2}}="+a+"ms^{-2}$$")
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

    }
    else if (!ub && vb && ab && sb && !tb) {
        $("#solution").html("<h3>Step 1: Assign values to variables:</h3>");
        $("#solution").append("Final velocity: v = "+v+" ms<sup>-1</sup><br/>");
        $("#solution").append("Acceleration: a = "+a+" ms<sup>-2</sup><br/>");
        $("#solution").append("Displacement: s = "+s+" m<p/><hr/>");
        $("#solution").append("<h3>Step 2. Use equations:</h3><br/>");
        $("#solution").append("For Initial Velocity:<br/>");
        $("#solution").append(v2u)
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("Change of subject and put in value");
        $("#solution").append("$$u={\\sqrt{v^2-2as}}$$")
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("$$u={\\sqrt{"+Num(v)+"^2-2("+a+")("+s+")}}="+u+"ms^{-1}$$")
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("For Time:<br/>");
        $("#solution").append(suv)
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("Change of subject and put in value");
        $("#solution").append("$$t={2s \\over {v+u}}$$")
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("$$t={2("+s+") \\over {"+v+"+"+Num(u)+"}}="+t+"s$$")
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    }
    else if (!ub && vb && ab && !sb && tb) {
       $("#solution").html("<h3>Step 1: Assign values to variables:</h3>");
       $("#solution").append("Final velocity: v = "+v+" ms<sup>-1</sup><br/>");
       $("#solution").append("Acceleration:a = "+a+" ms<sup>-2</sup><br/>");
       $("#solution").append("Time: t = "+t+" s<p/><hr/>");
       $("#solution").append("<h3>Step 2. Use equations:</h3><br/>");
       $("#solution").append("For Initial Velocity:<br/>");
       $("#solution").append(vua)
           MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
       $("#solution").append("Change of subject and put in value");
       $("#solution").append("$$u=v-at$$")
           MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
       $("#solution").append("$$u="+v+"-"+Num(a)+"("+t+")="+u+"ms^{-1}$$")
           MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
       $("#solution").append("For Displacement:<br/>");
       $("#solution").append(suv)
           MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
       $("#solution").append("Change of subject and put in value");
       $("#solution").append(suv)
           MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
       $("#solution").append("$$s={("+u+"+"+Num(v)+")\\times"+t+"\\over2}="+s+"m$$")
           MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    }
    else if (!ub && vb && !ab && sb && tb) {
        $("#solution").html("<h3>Step 1: Assign values to variables:</h3>");
        $("#solution").append("Final velocity: v = "+v+" ms<sup>-1</sup><br/>");
        $("#solution").append("Displacement:s = "+s+" m<br/>");
        $("#solution").append("Time: t = "+t+" s<p/><hr/>");
        $("#solution").append("<h3>Step 2. Use equations:</h3><br/>");
        $("#solution").append("For Initial Velocity:<br/>");
        $("#solution").append(suv)
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("Change of subject and put in value");
        $("#solution").append("$$u={2s\\over t}-v$$")
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("$$u={2("+s+")\\over "+t+"}-"+Num(v)+"="+u+"ms^{-1}$$")
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("For Acceleration:<br/>");
        $("#solution").append(vua)
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("Change of subject and put in value");
        $("#solution").append("$$a={v-u \\over t}$$")
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $("#solution").append("$$a={"+v+"-"+Num(u)+" \\over "+t+"}="+a+"ms^{-2}$$")
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    }
    else if (!ub && !vb && ab && sb && tb) {
       $("#solution").html("<h3>Step 1: Assign values to variables:</h3>");
       $("#solution").append("Acceleration: a = "+a+" ms<sup>-2</sup><br/>");
       $("#solution").append("Displacement:s = "+s+" m<br/>");
       $("#solution").append("Time: t = "+t+" s<p/><hr/>");
       $("#solution").append("<h3>Step 2. Use equations:</h3><br/>");
       $("#solution").append("For Initial Velocity:<br/>");
       $("#solution").append(sut)
           MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
       $("#solution").append("Change of subject and put in value");
       $("#solution").append("$$u={s-{1\\over2}at^2\\over t}$$")
           MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
       $("#solution").append("$$u={"+Num(s)+"-{1\\over2}("+a+")("+t+")^2\\over "+t+"}="+u+"ms^{-1}$$")
           MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
       $("#solution").append("For Final Velocity:<br/>");;
       $("#solution").append(vua)
           MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
       $("#solution").append("Change of subject and put in value");
       $("#solution").append("$$v=u+at$$")
           MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
       $("#solution").append("$$v="+u+"+"+Num(a)+"("+t+")="+v+"ms^{-1}$$")
           MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    }

}
