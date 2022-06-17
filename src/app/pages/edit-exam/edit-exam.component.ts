import {Component} from '@angular/core';
import {ExamsService} from "../../services/exams.service";
import {DialogService} from "../../services/dialog.service";
import {Answer} from "../../models/answer";
import {Exam} from "../../models/exam";
import {Question} from "../../models/question";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {InfoStatic} from "../../support/info-static";

@Component({
  selector: 'app-edit-exam',
  templateUrl: './edit-exam.component.html',
  styleUrls: ['./edit-exam.component.css']
})
export class EditExamComponent {

  constructor(public examService: ExamsService, private dialogService: DialogService,
              private route: ActivatedRoute) {
    this.examId = this.route.snapshot.paramMap.get('id');
    this.examService.getNewExamData().subscribe(data => this.difficultyLevels = data);
    this.examService.getExamById(this.examId).subscribe(data => {
      this.examModel.id = this.examId;
      this.examNameControl.patchValue(data.examName);
      this.difficultyLevelControl.patchValue(data.difficultyLevel);
      this.examTimeControl.patchValue(this.getExamTimeStringFromNumber(data.timeInSeconds));
      this.examModel.questions = data.questions;
    });
  }

  examId: any;
  examModel = new Exam();
  newQuestionType = "single";
  difficultyLevels: any;

  examNameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(255)
  ]);

  difficultyLevelControl = new FormControl('', [
    Validators.required,
  ]);

  examTimeControl = new FormControl('', [
    Validators.required,
    Validators.pattern("^\\d{2}:[0-5]\\d$"),
  ]);

  newExamForm = new FormGroup({
    examName: this.examNameControl,
    difficultyLevel: this.difficultyLevelControl,
    examTime: this.examTimeControl,
  });

  addNewQuestion() {
    let quest = this.examService.getNewQuestion(this.newQuestionType);
    this.examModel.questions.push(quest);
  }

  addNewAnswerToQuestion(question: Question) {
    let answer = new Answer(null, "", false);
    if (question.type === 'short') {
      answer.correctness = true;
    }
    question.answers.push(answer);
  }

  deleteThisQuestion(question: Question) {
    let index = this.examModel.questions.indexOf(question, 0);
    if (index > -1) {
      this.examModel.questions.splice(index, 1);
    }
  }

  deleteThisAnswer(question: Question, answer: Answer) {
    let index = question.answers.indexOf(answer, 0);
    if (index > -1) {
      question.answers.splice(index, 1);
    }
  }

  postExam() {
    if (this.newExamForm.valid
      && this.doAllQuestionsContainContent()
      && this.doAllAnswersContainContent()
      && this.doQuestionsContainMinimalAnswersNumber()
      && this.doQuestionsContainMinimalCorrectAnswersNumber()
      && this.examTimeCalc() != 0) {
      this.examModel.examName = this.examNameControl.value;
      this.examModel.difficultyLevel = this.difficultyLevelControl.value;
      this.examModel.timeInSeconds = this.examTimeCalc();
      this.examService.putExam(this.examModel).subscribe(console.log);
      alert("Exam saved.");
      window.location.reload();
    } else {
      if (!this.doAllAnswersContainContent())
        alert("All answers have to contain a content.");
      else if (!this.doAllQuestionsContainContent())
        alert("All questions have to contain a content.")
      else if (!this.doQuestionsContainMinimalAnswersNumber())
        alert("Single choice questions have to contain at least one answer, others - at least two.");
      else if (this.examTimeCalc() === 0)
        alert("Exam time cannot be zero.");
      else if (!this.doQuestionsContainMinimalCorrectAnswersNumber())
        alert("Every question has to contain at least one correct answer.");
      else
        alert(InfoStatic.checkFormData);
    }
  }

  doAllAnswersContainContent() {
    let count = 0;
    this.examModel.questions.forEach(question => {
      question.answers.forEach(answer => {
        if (answer.content.trim().length === 0) count++;
      });
    });
    return count === 0;
  }

  doAllQuestionsContainContent() {
    let count = 0;
    this.examModel.questions.forEach(question => {
      if (question.content.trim().length === 0) count++;
    });
    return count === 0;
  }

  doQuestionsContainMinimalAnswersNumber() {
    let count = 0;
    this.examModel.questions.forEach(question => {
      if (question.type == 'short') {
        if (question.answers.length < 1) count++;
      } else {
        if (question.answers.length < 2) count++;
      }
    });
    return count === 0;
  }

  doQuestionsContainMinimalCorrectAnswersNumber() {
    let count = 0;
    this.examModel.questions.forEach(question => {
      if (question.answers.filter(answer => answer.correctness).length == 0) count++;
    });
    return count == 0;
  }

  saveExam(information: string) {
    const answer = this.dialogService.getDialog(information);
    answer.afterClosed().subscribe(accept => {
      if (accept) this.postExam();
    });
  }

  examTimeCalc() {
    if (this.examTimeControl.value.length != 5) {
      return -1;
    } else {
      let hours = Number(this.examTimeControl.value.substring(0, 2));
      let minutes = Number(this.examTimeControl.value.substring(3));
      return (hours * 3600) + (minutes * 60);
    }
  }

  selectAnswer(answer: Answer, question: Question) {
    if (question.type === 'single') {
      question.answers.forEach(answer => answer.correctness = false);
      answer.correctness = true;
    }
  }

  getExamTimeStringFromNumber(seconds: number) {
    let h = "00";
    let min: string;
    if (seconds >= 3600) {
      h = Math.floor(seconds / 3600).toString();
      min = Math.floor(((seconds % 3600) / 60)).toString();
    } else {
      min = Math.floor(((seconds % 3600) / 60)).toString();
    }
    if (h.length == 1) h = "0" + h;
    if (min.length == 1) min = "0" + min;
    return h + ":" + min;
  }

}
