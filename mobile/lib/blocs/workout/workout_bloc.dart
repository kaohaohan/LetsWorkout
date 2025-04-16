import 'package:flutter_bloc/flutter_bloc.dart';
import 'workout_event.dart';
import 'workout_state.dart';
import '../../services/api_service.dart';
import '../../models/workout.dart';
import '../../models/workout_set.dart';

class WorkoutBloc extends Bloc<WorkoutEvent, WorkoutState> {
  final ApiService _apiService = ApiService();

  WorkoutBloc() : super(WorkoutInitial()) {
    on<LoadExercises>(_onLoadExercises);
    on<StartWorkout>(_onStartWorkout);
    on<FinishWorkout>(_onFinishWorkout);
    on<CancelWorkout>(_onCancelWorkout);
    on<AddWorkoutSet>(_onAddWorkoutSet);
    on<LoadWorkoutHistory>(_onLoadWorkoutHistory);
  }

  // 加載運動項目列表
  Future<void> _onLoadExercises(
    LoadExercises event,
    Emitter<WorkoutState> emit,
  ) async {
    emit(WorkoutLoading());
    try {
      final exercises = await _apiService.getAllExercises();
      emit(ExercisesLoaded(exercises));
    } catch (e) {
      emit(WorkoutError('無法加載運動項目: $e'));
    }
  }

  // 開始新訓練
  Future<void> _onStartWorkout(
    StartWorkout event,
    Emitter<WorkoutState> emit,
  ) async {
    emit(WorkoutLoading());
    try {
      final workout = await _apiService.startWorkout(
        name: event.name,
        notes: event.notes,
      );
      emit(WorkoutStarted(workout));
      emit(WorkoutInProgress(workout: workout));
    } catch (e) {
      emit(WorkoutError('無法開始訓練: $e'));
    }
  }

  // 完成訓練
  Future<void> _onFinishWorkout(
    FinishWorkout event,
    Emitter<WorkoutState> emit,
  ) async {
    emit(WorkoutLoading());
    try {
      final completedWorkout = await _apiService.finishWorkout(event.workoutId);
      // 這裡需要獲取完整的訓練數據，包括相關的 WorkoutSet
      // 簡化處理，實際應用中應該獲取與這個 workout 相關的所有 sets
      emit(
        WorkoutCompleted(
          workout: completedWorkout,
          workoutSets: [], // 簡化實現，實際應該加載相關的 sets
        ),
      );
    } catch (e) {
      emit(WorkoutError('無法完成訓練: $e'));
    }
  }

  // 取消訓練
  Future<void> _onCancelWorkout(
    CancelWorkout event,
    Emitter<WorkoutState> emit,
  ) async {
    emit(WorkoutLoading());
    try {
      await _apiService.cancelWorkout(event.workoutId);
      emit(WorkoutInitial());
    } catch (e) {
      emit(WorkoutError('無法取消訓練: $e'));
    }
  }

  // 添加訓練組數
  Future<void> _onAddWorkoutSet(
    AddWorkoutSet event,
    Emitter<WorkoutState> emit,
  ) async {
    // 保存當前狀態以便恢復
    final currentState = state;
    if (currentState is WorkoutInProgress) {
      try {
        final workoutSet = await _apiService.addWorkoutSet(
          exerciseId: event.exerciseId,
          workoutName: event.workoutName,
          sets: event.sets,
        );

        // 更新狀態，添加新的 WorkoutSet
        final updatedSets = List<WorkoutSet>.from(currentState.workoutSets)
          ..add(workoutSet);

        emit(
          WorkoutInProgress(
            workout: currentState.workout,
            workoutSets: updatedSets,
          ),
        );
      } catch (e) {
        emit(WorkoutError('無法添加訓練組數: $e'));
        // 恢復到之前的狀態
        emit(currentState);
      }
    }
  }

  // 加載訓練歷史
  Future<void> _onLoadWorkoutHistory(
    LoadWorkoutHistory event,
    Emitter<WorkoutState> emit,
  ) async {
    emit(WorkoutLoading());
    try {
      final workouts = await _apiService.getWorkoutHistory();
      emit(WorkoutHistoryLoaded(workouts));
    } catch (e) {
      emit(WorkoutError('無法加載訓練歷史: $e'));
    }
  }
}
