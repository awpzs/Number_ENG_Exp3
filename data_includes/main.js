PennController.ResetPrefix(null); //Initiates PennController
var showProgressBar = false;
//PennController.DebugOff()
PennController.AddHost("https://raw.githubusercontent.com/awpzs/Number_ENG_Exp3/main/images/")
PennController.AddHost("https://raw.githubusercontent.com/awpzs/Number_ENG_Exp3/main/images_fillers/")

Sequence( "setcounter", "information", "survey", "identification", "recording_information", "initRecorder", "instruction", "prac", "exp_start", "exp_block1", "rest", "exp_block2", "send", "final" )

PennController.SetCounter( "setcounter" )

newTrial( "information" ,
    newHtml("information", "information.html")
        .print()
    ,
    newButton("Continue")
        .settings.center()
        .print()
        .wait(getHtml("information").test.complete()
            .failure(getHtml("information").warn()))
)

newTrial( "survey" ,
    newHtml("questionnaire", "survey.html")
        .print()
        .log()
    ,
    newButton("Start")
        .settings.center()
        .print()
        .wait(getHtml("questionnaire").test.complete()
            .failure(getHtml("questionnaire").warn()))
)
.log( "ID", PennController.GetURLParameter("id") )

newTrial( "identification" ,
    newText("<p>Below is your Prolific ID for this experiment.</p><p>Please take a note of it in case you need it as a reference.</p><p>Press <strong>Continue</strong> to proceed.</p>")
        .print()
    ,
    newTextInput("inputID", GetURLParameter("id"))
        .settings.center()
        .log("final")
        .print()
    ,
    newButton("Continue")
        .settings.center()
        .print()
        .wait()
//    ,
//    newVar("ID")
//        .global()
//        .set( GetURLParameter("id") )
)
.log( "ID" , GetURLParameter("id") )

newTrial("recording_information" ,
    newText("<p><strong>Important:</strong></p><p>Your responses will be audio-recorded during the experiment, so please complete this experiment in a quiet place.</p><p>Please stay focused during the experiment, and finish it in one go. You will be able to take a brief break (1-2 mins), where specified.</p><p>You will not be able to return to this study if you closed or refreshed this webpage.</p>")
        .print()
    ,
    newButton("Continue")
        .settings.center()
        .print()
        .wait()    
)

InitiateRecorder("https://localhost/pcibex/index.php", "Please grant expt.pcibex.net access to your microphone.").label("initRecorder")
//InitiateRecorder("https://langprolab.stir.ac.uk/pcibex/index.php", "Please grant expt.pcibex.net access to your microphone.").label("initRecorder")

Template(
    GetTable("instructions.csv")
        .setGroupColumn("list")
        , variable =>
    newTrial( "instruction" ,
        newHtml("information", variable.insPage)
            .print()
        ,
        newButton("Continue")
            .settings.center()
            .print()
            .wait(getHtml("information").test.complete()
                .failure(getHtml("information").warn()))
  )
  .log( "ID"     , GetURLParameter("id")    )
  )

Template(
    GetTable("prac.csv")
        .setGroupColumn("list")
        , variable =>
        newTrial( "prac" ,
            newMediaRecorder("recorder", "audio")
                .record()
            ,
            newText("inst_read", "<p>Please read the sentence aloud, and then click on the sentence to proceed.</p>")
                .settings.center()
                .bold()
                .print()
            ,
            newImage("one", variable.firstDisplay)
                .size(600,400)
                .css("padding", "10px")
                .settings.center()
                .print()
            ,
            newText("sentence", variable.sentence)
                .settings.center()
                .bold()
                .print()
            ,
            newSelector()
                .add( getText("sentence") )
                .wait()
            ,
            clear()
            ,
            newText("In this example, you could say:&nbsp;").bold()
                .settings.after(newText(variable.target1).bold())
                .settings.after(newText("&nbsp;OR&nbsp;").bold())
                .settings.after(newText(variable.target2).bold())
//                .settings.after(newText("&nbsp; Choose referring expressions depending on situations.").bold())
//                .settings.after(newText("Please press “Proceed” after finishing your responses completely.").bold())
                .settings.center()
                .print()
            ,
            newText("<p>Choose referring expressions depending on situations.</p>").bold()
                .settings.after(newText("&nbsp;Please press “Proceed” after finishing your responses completely.").bold())
                .settings.center()
                .print()
            ,
            newImage("two", variable.secondDisplay)
                .size(600,400)
                .css("padding", "10px")
                .settings.center()
                .print()
            ,
            newButton("Proceed")
                .settings.center()
                .print()
                .wait()
            ,
            newTimer("wait", 500)
                .start()
                .wait()
            ,
            getMediaRecorder("recorder")
                .stop()
            ,
            getMediaRecorder("recorder").test.recorded()
                .failure(newText("Sorry, there seems to be something wrong with your microphone. Please stop the experiment, and contact the researcher.").settings.center().print())
  )
  .log( "ID"   , GetURLParameter("id") )
  .log( "List" , variable.list )
  .log( "Item" , variable.item )
  .log( "Condition" , variable.condition )
  .log( "ExpTrials" , variable.expTrials )
//  .log( "TargetType" , variable.target_type)
  .log( "TargetNumber" , variable.target_num )
  .log( "CompetitorNumber" , variable.comp_num )
//  .log( "Ambiguity" , variable.ambiguity )
  .log( "Sentence"  , variable.sentence )
  )

newTrial("exp_start",
        newText("<p>This is the end of the instructions. Please click on <strong>Start</strong> to start the experiment.</p><p>No instructions or examples will be provided during the experiment.</p>")
            .settings.center()
            .print()
        ,
        newButton("Start")
            .settings.center()
            .print()
            .wait()
)
  
Template(
    GetTable("fulldesign.csv")
        .setGroupColumn("list")
        .filter(variable => variable.order < 64)
        , variable =>
        newTrial( "exp_block1" ,
            newMediaRecorder("recorder", "audio")
                .record()
            ,
            newImage("one", variable.firstDisplay)
                .size(600,400)
                .css("padding", "10px")
                .settings.center()
                .print()
            ,
            newText("sentence", variable.sentence)
                .settings.center()
                .bold()
                .print()
            ,
            newSelector()
                .add( getText("sentence") )
                .wait()
            ,
            clear()
            ,
            newImage("two", variable.secondDisplay)
                .size(600,400)
                .css("padding", "10px")
                .settings.center()
                .print()
            ,
            newButton("Proceed")
                .settings.center()
                .print()
                .wait()
            ,
            newTimer("wait", 500)
                .start()
                .wait()
            ,
            getMediaRecorder("recorder")
                .stop()
            ,
            getMediaRecorder("recorder").test.recorded()
                .failure(newText("Sorry, there seems to be something wrong with your microphone. Please stop the experiment, and contact the researcher.").settings.center().print())
  )
  .log( "ID"   , GetURLParameter("id") )
  .log( "List" , variable.list )
  .log( "Item" , variable.item )
  .log( "Condition" , variable.condition )
  .log( "ExpTrials" , variable.expTrials )
//  .log( "TargetType" , variable.target_type)
  .log( "TargetNumber" , variable.target_num )
  .log( "CompetitorNumber" , variable.comp_num )
//  .log( "Ambiguity" , variable.ambiguity )
  .log( "Sentence"  , variable.sentence )
  )
  

newTrial( "rest" ,
  newText("<p>Now you can take a break (1-2 mins).</p><p>Press <strong>Continue</strong> when you are ready.</p>")
      .print()
  ,
  newButton("Continue")
      .settings.center()
      .print()
      .wait()
)

Template(
    GetTable("fulldesign.csv")
        .setGroupColumn("list")
        .filter(variable => variable.order > 63)
        , variable =>
        newTrial( "exp_block2" ,
            newMediaRecorder("recorder", "audio")
                .record()
            ,
            newImage("one", variable.firstDisplay)
                .size(600,400)
                .css("padding", "10px")
                .settings.center()
                .print()
            ,
            newText("sentence", variable.sentence)
                .settings.center()
                .bold()
                .print()
            ,
            newSelector()
                .add( getText("sentence") )
                .wait()
            ,
            clear()
            ,
            newImage("two", variable.secondDisplay)
                .size(600,400)
                .css("padding", "10px")
                .settings.center()
                .print()
            ,
            newButton("Proceed")
                .settings.center()
                .print()
                .wait()
            ,
            getMediaRecorder("recorder")
                .stop()
            ,
            getMediaRecorder("recorder").test.recorded()
                .failure(newText("Sorry, there seems to be something wrong with your microphone. Please stop the experiment, and contact the researcher.").settings.center().print())
  )
  .log( "ID"   , GetURLParameter("id") )
  .log( "List" , variable.list )
  .log( "Item" , variable.item )
  .log( "Condition" , variable.condition )
  .log( "ExpTrials" , variable.expTrials )
//  .log( "TargetType" , variable.target_type)
  .log( "TargetNumber" , variable.target_num )
  .log( "CompetitorNumber" , variable.comp_num )
//  .log( "Ambiguity" , variable.ambiguity )
  .log( "Sentence"  , variable.sentence )
  )

SendResults( "send" )

newTrial( "final" 
//  , newFunction("redirect", function(){ window.location = "https://app.prolific.co/submissions/complete?cc=30CBCF4D"; })
    ,
    newText("<p>Thank you very much for your participation!</p>")
        .settings.center()
        .print()
    ,
    newText("<p>If you were asked to download a copy of the recordings on the last page, please send the file and your Prolific ID to <strong>kumiko.fukumura[at]stir.ac.uk.</strong></p><p>Otherwise, please click on the link below to validate your participation.</p>")
        .settings.center()
        .print()
    ,
    newText("<p><a href='https://app.prolific.co/submissions/complete?cc=30CBCF4D' href='_blank'>Click here to validate your participation and finish the experiment</a></p>")
        .settings.center()
        .print()
    ,
    newText("<p>Please see below for a debriefing of this study.</p>")
        .settings.center()
        .print()
    ,
    newHtml("debriefing", "debrief.html")
        .print()
    ,
    newButton("void")
        .wait()
//  , getFunction("redirect").call()
)
