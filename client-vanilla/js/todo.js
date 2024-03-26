$(function() {

    $("#getQuestionnaires").click(refreshQuestionnaires);

    function remplirQuestionnaires(questionnaires) {
      $('#questionnaires').empty();
      $('#questionnaires').append($('<ul>'));
      questionnaires.forEach(questionnaire => {
        $('#questionnaires ul')
            .append($('<li>')
            .append($('<a>')
            .text(questionnaire.name)
                ).on("click", () => refreshQuestions(questionnaire.id))
            );
    });
      }

      function onerror(err) {
          $("#taches").html("<b>Impossible de récupérer les taches à réaliser !</b>"+err);
    }

    function refreshQuestionnaires(){
        console.log("refreshTaskList");
        $("#currenttask").empty();
        requete = "http://localhost:5000/quiz/api/questionnaires";
        fetch(requete)
        .then( response => {
            console.log(response);
                  if (response.ok) {
                    return response.json()
                  }
                  else throw new Error('Problème ajax: '+response.status);
                }
            )
        .then(remplirQuestionnaires)
        .catch(onerror);
      }

    function remplirQuestions(questions) {
        $('#questions').empty();
        $('#questions').append($('<ul>'));
        questions['questions'].forEach(question =>{
            console.log(question);
            $('#questions ul')
                    .append($('<li>')
                        .append($('<h4>')
                            .text(question.title))
                            .on('click', () => {
                                formTask(false, question.questionType === "multiple", question.questionnaire_id, question);
                            })
                        .append($('<p>')
                            .text(question.questionType == "multiple" ? ("propositions: " + question.prop1 + " ou " + question.prop2) : ""))
                        .append($('<p>')
                            .text("reponse : " + (question.questionType === "multiple" ? (question.reponse == 1 ? question.prop1 : question.prop2) : question.reponse) ))
                    )
            }
        );
        formTask(true, false, questions.id)
        }

    function refreshQuestions(taskid){
        requete = "http://localhost:5000/quiz/api/questionnaires/"+taskid;
        fetch(requete)
        .then( response => {
            console.log(response);
            if (response.ok){
                return response.json()
            }
            else throw new Error('Problème ajax: '+response.status);
        })
        .then(remplirQuestions)
        .catch(onerror);
    }

    function details(event){
        $("#currenttask").empty();
        formTask();
        fillFormTask(event.data);
        }


    class Question{
        constructor(title, questionType, questionnaire_id, reponse, prop1, prop2){
            this.id = null;
            this.title = title;
            this.questionType = questionType;
            this.questionnaire_id = questionnaire_id;
            this.reponse = reponse;
            this.prop1 = prop1;
            this.prop2 = prop2;
        }

        setID(id){
            this.id = id;
        }
    }


    $("#tools #add").on("click", formTask);
    $('#tools #del').on('click', delTask);

    function formTask(isnew,isMultiple, idQuestionnaire, question){
        console.log(isMultiple)
        
        let multipleRadio = $(`<input type="radio" name="type" id="isMultiple" ${isMultiple ? "checked" : ""}>`);
        let simpleRadio = $(`<input type="radio" name="type" id="isSimple" ${!isMultiple ? "checked" : ""}>`);

        multipleRadio.on("click", () => {formTask(isnew, true, idQuestionnaire)});
        simpleRadio.on("click", () => {formTask(isnew, false, idQuestionnaire)});

        $("#currenttask").empty();
        $("#currenttask")
            .append(!isnew ? $(`<input type="hidden" id="question_id" value=${question.id} />`) : "")
            .append($(`<span><input type="hidden" id="questionnaire_id" value="${idQuestionnaire}" /> Id du questionnaire: ${idQuestionnaire}<br></span>`))
            .append($(`<span>Titre<input type="text" id="title" value="${question? question.title : ""}"><br></span>`))
            .append($('<span name="type">')
                .append('Type:  Multiple').append(multipleRadio)
                .append('Simple').append(simpleRadio)
            )
            .append(isMultiple? `<br>Choix1 <input type="text" id="textChoix1" value="${question ? question.prop1 : ""}"/> Choix2 <input type="text" id="textChoix2" value="${question ? question.prop2 : ""}/>` : "")
            .append($('<br><span>Reponse:' + (!isMultiple ? `<input type="text" id="reponse" value="${question ? question.reponse : ""}"">` : (`Choix1<input type="radio" name="choix" id="choix1" ${question ? question.reponse == 1 : ""}/> Choix2<input type="radio" name="choix" id="choix2" ${question ? question.reponse == 2 : ""}/>`) ) +'<br></span>'))
            .append($('<span><input type="hidden" id="turi"><br></span>'))
            .append(isnew?$('<span><input type="button" value="Ajouter une question"><br></span>').on("click", saveNewTask)
                         :$('<span><input type="button" value="Modifier une question"><br><br></span>').on("click", saveModifiedTask)
                )
            .append($('<h2>Ajouter un questionnaire</h2>'))
            .append($('<span>Nom du questionnaire <input type="text" id="questionnaireName" value=""><br></span>'))
            .append(idQuestionnaire == undefined ? $('<span><input type="button" value="Ajouter un questionnaire"> <br></span>').on("click", saveNewQuestionnaire) : $('<span><input type="button" value="Modifier le questionnaire"> <br></span>').on("click", updateQuestionnaire))
            .append($('<span><input type="button" value="Supprimer le questionnaires"> <br></span>').on("click", deleteQuestionnaire))
        }

    function deleteQuestionnaire(){
        let questionnaireId = $("#questionnaire_id").val();
        fetch("http://localhost:5000/quiz/api/questionnaires/"+questionnaireId, {
            method: "DELETE"
        })
        .then(res => { console.log('Delete Success') ;
                          $("#result").text(res['contenu']);
                            refreshQuestionnaires();
                    })
        .catch( res => { console.log(res) });
    }

    function updateQuestionnaire(){
        let questionnaire = {name: $("#questionnaireName").val()};
        let idQuestionnaire = $("#questionnaire_id").val();
        fetch("http://localhost:5000/quiz/api/questionnaires/"+idQuestionnaire,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(questionnaire)
        })
        .then(res => { console.log('Save Success') ;
                refreshQuestionnaires();
            })
        .catch( res => { console.log(res) });
    }


    function saveNewQuestionnaire(){
        // il faut envoyer un json avec name=questionnaireName
        let questionnaire = {name: $("#questionnaireName").val()};
        fetch("http://localhost:5000/quiz/api/questionnaires",{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(questionnaire)
        })
        .then(res => { console.log('Save Success') ;
                refreshQuestionnaires();
            })
        .catch( res => { console.log(res) });
    }

    function fillFormTask(t){
        $("#currenttask #titre").val(t.title);
        $("#currenttask #descr").val(t.description);
         t.uri=(t.uri == undefined)?"http://localhost:5000/todo/api/v1.0/tasks"+t.id:t.uri;
         $("#currenttask #turi").val(t.uri);
        t.done?$("#currenttask #done").prop('checked', true):
        $("#currenttask #done").prop('checked', false);
    }

    function saveNewTask(){
        const isMultiple = $("#currenttask input[name='type']:checked").attr('id') == "isMultiple" ? "multiple" : "unique";
        let questionnaireIdValue = $("#questionnaire_id").val();
console.log($("#currenttask #reponse").val());
        var question = new Question(
            $("#currenttask #title").val(),
            isMultiple,
            $("#currenttask #questionnaire_id").attr('value'),
            isMultiple === "multiple" ? ($("#currenttask input[name='choix']:checked").attr('id') == "choix1" ? 1 : 2) : $("#currenttask #reponse").val(),
            isMultiple === "multiple" && $("#currenttask #textChoix1").val(),
            isMultiple === "multiple" && $("#currenttask #textChoix2").val()
        );
        console.log(JSON.stringify(question));
        fetch("http://localhost:5000/quiz/api/questions",{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(question)
            })
        .then(res => { console.log('Save Success') ;
                       $("#result").text(res['contenu']);
                       refreshQuestionnaires();
                       refreshQuestions(questionnaireIdValue);
                   })
        .catch( res => { console.log(res) });
    }

    function saveModifiedTask(){
        const isMultiple = $("#currenttask input[name='type']:checked").attr('id') == "isMultiple" ? "multiple" : "unique";
        let questionnaireIdValue = $("#questionnaire_id").val();
        console.log($("#currenttask #reponse").val());
        var question = new Question(
            $("#currenttask #title").val(),
            isMultiple,
            $("#currenttask #questionnaire_id").attr('value'),
            isMultiple === "multiple" ? ($("#currenttask input[name='choix']:checked").attr('id') == "choix1" ? 1 : 2) : $("#currenttask #reponse").val(),
            isMultiple === "multiple" && $("#currenttask #textChoix1").val(),
            isMultiple === "multiple" && $("#currenttask #textChoix2").val()
        );
        question.setID($("#currenttask #question_id").val());
        console.log(JSON.stringify(question));
        fetch("http://localhost:5000/quiz/api/questions/"+question.id,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(question)
            })
        .then(res => { console.log('Save Success') ;
                       $("#result").text(res['contenu']);
                       refreshQuestionnaires();
                       refreshQuestions(questionnaireIdValue);
                   })
        .catch( res => { console.log(res) });
    }

    function delTask(){
        const idQuestion = $("#currenttask #question_id").val();
        const idQuestionnaire = $("#currenttask #questionnaire_id").val();
        
        fetch("http://localhost:5000/quiz/api/questions/"+idQuestion,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "DELETE"
            })
        .then(res => { console.log('Delete Success') ;
                       $("#result").text(res['contenu']);
                       refreshQuestionnaires();
                       refreshQuestions(idQuestionnaire);
                   })
        .catch( res => { console.log(res) });
    }

});
