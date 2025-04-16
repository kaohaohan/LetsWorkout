import 'dart:convert';

class Workout {
  final String id;
  final String name;
  final String notes;
  final DateTime startTime;
  DateTime? endTime;
  int? duration;
  final String status; // 'in_progress', 'completed', 'cancelled'
  final List<String> exercises; // 存儲 WorkoutSet 的 ID

  Workout({
    required this.id,
    required this.name,
    required this.notes,
    required this.startTime,
    this.endTime,
    this.duration,
    required this.status,
    required this.exercises,
  });

  factory Workout.fromJson(Map<String, dynamic> json) {
    return Workout(
      id: json['_id'],
      name: json['name'] ?? '未命名訓練',
      notes: json['notes'] ?? '',
      startTime: DateTime.parse(json['startTime']),
      endTime: json['endTime'] != null ? DateTime.parse(json['endTime']) : null,
      duration: json['duration'],
      status: json['status'],
      exercises: List<String>.from(json['exercises'] ?? []),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'name': name,
      'notes': notes,
      'startTime': startTime.toIso8601String(),
      'endTime': endTime?.toIso8601String(),
      'duration': duration,
      'status': status,
      'exercises': exercises,
    };
  }
}
