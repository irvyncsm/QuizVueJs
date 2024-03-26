from .app import app,db
from .models import Questionnaire, SimpleQuestion, QuestionMultiple

@app.cli.command()
def syncdb():
    """Initializes the database."""
    db.create_all()
    
    questionnaire1 = Questionnaire("Questionnaire 1")
    questionnaire2 = Questionnaire("Questionnaire 2")
    db.session.add(questionnaire1)
    db.session.add(questionnaire2)
    db.session.commit()
    
    simple_question = SimpleQuestion("Simple question", questionnaire1.id, "texteee")
    simple_question2 = SimpleQuestion("Simple question 2", questionnaire2.id, "textee")
    db.session.add(simple_question)
    db.session.add(simple_question2)
    db.session.commit()
    
    multiple_question1 = QuestionMultiple("Multiple question 1", questionnaire1.id, 1, "prop1", "prop2")
    multiple_question2 = QuestionMultiple("Multiple question 2", questionnaire2.id, 2, "prop3", "prop4")
    db.session.add(multiple_question1)
    db.session.add(multiple_question2)
    db.session.commit()
    
    print("Database initialized")
    