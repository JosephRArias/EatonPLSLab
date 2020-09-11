import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Project } from './project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  form : FormGroup;

  projects: Project[] = [
    {id: 1, name: "EMCB", description : "Wifi Breaker"},
    {id: 2, name: "Time Logger", description : "App Dev"},
  ];

  constructor() { 
    this.form = new FormGroup({
      'name' : new FormControl('', [Validators.required, Validators.minLength(3)]),
      'description' : new FormControl('', [Validators.required, Validators.minLength(3)])
    });

  }

  ngOnInit() {
  }

  addProject(){

    const newProject = new Project(this.projects.length + 1, this.form.value.name, this.form.value.description);

    this.projects.push(newProject);

    this.form.reset();
  }

  deleteProject(id:Number){
    console.info(id);
  }

}
