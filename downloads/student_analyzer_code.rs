use eframe::egui;
use std::fs::OpenOptions;
use std::io::{BufWriter, Write};

fn main() -> Result<(), eframe::Error> {
    let options = eframe::NativeOptions::default();
    eframe::run_native(
        "Student Analyzer",
        options,
        Box::new(|_cc| Box::<StudentApp>::default()),
    )
}

struct StudentApp {
    name: String,
    roll_no: String,
    subjects: Vec<String>,
    selected_subjects: [usize; 7],
    marks: [String; 7],
    average: Option<f32>,
    result: Option<String>,
}

impl Default for StudentApp {
    fn default() -> Self {
        Self {
            name: String::new(),
            roll_no: String::new(),
            subjects: vec![
                "Math".to_string(),
                "Science".to_string(),
                "English".to_string(),
                "Social".to_string(),
                "Computer".to_string(),
                "Hindi".to_string(),
                "Tamil".to_string(),
            ],
            selected_subjects: [0; 7],
            marks: Default::default(),
            average: None,
            result: None,
        }

    }
}

impl eframe::App for StudentApp {
    fn update(&mut self, ctx: &egui::Context, _frame: &mut eframe::Frame) {
        ctx.set_visuals(egui::Visuals::light());

        egui::CentralPanel::default().show(ctx, |ui| {
            ui.vertical_centered(|ui| {
                ui.heading("🎓 Student Analyzer");
            });

            ui.add_space(20.0);

            ui.vertical_centered(|ui| {
                ui.horizontal(|ui| {
                    ui.label("Name:");
                    ui.text_edit_singleline(&mut self.name);
                });

                ui.horizontal(|ui| {
                    ui.label("Roll No:");
                    ui.text_edit_singleline(&mut self.roll_no);
                });

                ui.add_space(10.0);

                for i in 0..7 {
                    ui.horizontal(|ui| {
                        ui.label(format!("Subject {}:", i + 1));
                        egui::ComboBox::from_id_source(format!("subject_{}", i))
                            .selected_text(&self.subjects[self.selected_subjects[i]])
                            .show_ui(ui, |ui| {
                                for (idx, subject) in self.subjects.iter().enumerate() {
                                    ui.selectable_value(&mut self.selected_subjects[i], idx, subject);
                                }
                            });
                        ui.text_edit_singleline(&mut self.marks[i]);
                    });
                }

                ui.add_space(10.0);

                ui.horizontal(|ui| {
                    ui.add_space((ui.available_width() - 200.0) / 2.0); // roughly center both buttons (each ~100px){
                    if ui.button("Calculate").clicked() {
                        let mut total = 0.0;
                        let mut valid = true;

                        for m in self.marks.iter() {
                            if let Ok(val) = m.trim().parse::<f32>() {
                                total += val;
                            } else {
                                valid = false;
                                break;
                            }
                        }

                        if valid {
                            let avg = total / self.marks.len() as f32;
                            self.average = Some(avg);
                            self.result = Some(if avg >= 40.0 {
                                "Pass".to_string()
                            } else {
                                "Fail".to_string()
                            });

                            // ✅ Save to CSV only on valid input
                            let file_path = "student_analyzer.csv";
                            let file_exists = std::path::Path::new(file_path).exists();

                            let file = OpenOptions::new()
                                .create(true)
                                .append(true)
                                .open(file_path)
                                .expect("Cannot open file");

                            let mut writer = BufWriter::new(file);

                            if !file_exists {
                                write!(writer, "Name,Roll No.").unwrap();
                                for i in 0..7 {
                                    write!(writer, ",{}", self.subjects[self.selected_subjects[i]]).unwrap();
                                }
                                writeln!(writer, ",Average,Result").unwrap();
                            }

                            write!(writer, "{},{}", self.name, self.roll_no).unwrap();
                            for mark in &self.marks {
                                write!(writer, ",{}", mark.trim()).unwrap();
                            }
                            writeln!(
                                writer,
                                ",{:.2},{}",
                                avg,
                                self.result.clone().unwrap_or_default()
                            ).unwrap();
                        } else {
                            self.average = None;
                            self.result = Some("Invalid input!".to_string());
                        }
                    }

                    ui.add_space(20.0);

                    if ui.button("Clear").clicked() {
                        self.name.clear();
                        self.roll_no.clear();
                        for i in 0..7 {
                            self.marks[i].clear();
                            self.selected_subjects[i] = 0; // reset to first subject
                        }
                        self.average = None;
                        self.result = None;
                    }
                });

                ui.add_space(10.0);

                if let Some(avg) = self.average {
                    ui.label(format!("📊 Average: {:.2}", avg));
                }
                if let Some(res) = &self.result {
                    ui.label(format!("✅ Result: {}", res));
                }
            });
        });
    }
}