import 'dart:convert';

class WorkoutSet {
  final String id;
  final String exerciseId;
  final String workoutName;
  final DateTime date;
  final List<SetInfo> sets;
  final double? calculated1RM;
  final double? totalVolume;

  WorkoutSet({
    required this.id,
    required this.exerciseId,
    required this.workoutName,
    required this.date,
    required this.sets,
    this.calculated1RM,
    this.totalVolume,
  });

  factory WorkoutSet.fromJson(Map<String, dynamic> json) {
    return WorkoutSet(
      id: json['_id'],
      exerciseId: json['exerciseId'],
      workoutName: json['workoutName'] ?? '未命名訓練',
      date: DateTime.parse(json['date']),
      sets: (json['sets'] as List).map((e) => SetInfo.fromJson(e)).toList(),
      calculated1RM: json['calculated1RM']?.toDouble(),
      totalVolume: json['totalVolume']?.toDouble(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'exerciseId': exerciseId,
      'workoutName': workoutName,
      'date': date.toIso8601String(),
      'sets': sets.map((s) => s.toJson()).toList(),
      'calculated1RM': calculated1RM,
      'totalVolume': totalVolume,
    };
  }
}

class SetInfo {
  final double weight;
  final int reps;
  final bool isPersonalRecord;

  SetInfo({
    required this.weight,
    required this.reps,
    this.isPersonalRecord = false,
  });

  factory SetInfo.fromJson(Map<String, dynamic> json) {
    return SetInfo(
      weight: json['weight']?.toDouble() ?? 0.0,
      reps: json['reps'] ?? 0,
      isPersonalRecord: json['isPersonalRecord'] ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'weight': weight,
      'reps': reps,
      'isPersonalRecord': isPersonalRecord,
    };
  }
}
