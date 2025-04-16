import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/workout.dart';
import '../models/workout_set.dart';
import '../models/exercise.dart';

class ApiService {
  final Dio _dio = Dio();
  final String _baseUrl = 'http://10.0.2.2:3001/api'; // 對於模擬器使用，實際設備需要修改

  ApiService() {
    _dio.options.connectTimeout = const Duration(seconds: 10);
    _dio.options.receiveTimeout = const Duration(seconds: 10);
  }

  // 取得所有運動項目
  Future<List<Exercise>> getAllExercises() async {
    try {
      final response = await _dio.get('$_baseUrl/exercises');
      if (response.statusCode == 200) {
        final List<dynamic> exercisesJson = response.data;
        return exercisesJson.map((json) => Exercise.fromJson(json)).toList();
      } else {
        throw Exception('獲取運動失敗: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('獲取運動出錯: $e');
    }
  }

  // 開始一個新的訓練
  Future<Workout> startWorkout({String? name, String? notes}) async {
    try {
      final response = await _dio.post(
        '$_baseUrl/workouts',
        data: {'name': name ?? '訓練', 'notes': notes ?? ''},
      );

      if (response.statusCode == 201) {
        return Workout.fromJson(response.data['workout']);
      } else {
        throw Exception('創建訓練失敗: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('創建訓練出錯: $e');
    }
  }

  // 結束訓練
  Future<Workout> finishWorkout(String workoutId) async {
    try {
      final response = await _dio.put('$_baseUrl/workouts/$workoutId/finish');

      if (response.statusCode == 200) {
        return Workout.fromJson(response.data['workout']);
      } else {
        throw Exception('完成訓練失敗: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('完成訓練出錯: $e');
    }
  }

  // 取消訓練
  Future<void> cancelWorkout(String workoutId) async {
    try {
      final response = await _dio.delete(
        '$_baseUrl/workouts/$workoutId/cancel',
      );

      if (response.statusCode != 200) {
        throw Exception('取消訓練失敗: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('取消訓練出錯: $e');
    }
  }

  // 添加運動組數
  Future<WorkoutSet> addWorkoutSet({
    required String exerciseId,
    required String workoutName,
    required List<SetInfo> sets,
  }) async {
    try {
      final response = await _dio.post(
        '$_baseUrl/workout-sets',
        data: {
          'exerciseId': exerciseId,
          'workoutName': workoutName,
          'sets': sets.map((set) => set.toJson()).toList(),
        },
      );

      if (response.statusCode == 201) {
        return WorkoutSet.fromJson(response.data['workoutSet']);
      } else {
        throw Exception('添加訓練組數失敗: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('添加訓練組數出錯: $e');
    }
  }

  // 獲取訓練歷史
  Future<List<Workout>> getWorkoutHistory() async {
    try {
      final response = await _dio.get('$_baseUrl/workouts/history');

      if (response.statusCode == 200) {
        final List<dynamic> workoutsJson = response.data['workouts'];
        return workoutsJson.map((json) => Workout.fromJson(json)).toList();
      } else {
        throw Exception('獲取訓練歷史失敗: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('獲取訓練歷史出錯: $e');
    }
  }
}
