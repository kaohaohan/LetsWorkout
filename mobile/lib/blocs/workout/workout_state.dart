import 'package:equatable/equatable.dart';
import '../../models/workout.dart';
import '../../models/exercise.dart';
import '../../models/workout_set.dart';

abstract class WorkoutState extends Equatable {
  const WorkoutState();

  @override
  List<Object?> get props => [];
}

// 初始狀態
class WorkoutInitial extends WorkoutState {}

// 加載中狀態
class WorkoutLoading extends WorkoutState {}

// 錯誤狀態
class WorkoutError extends WorkoutState {
  final String message;

  const WorkoutError(this.message);

  @override
  List<Object?> get props => [message];
}

// 運動項目加載成功
class ExercisesLoaded extends WorkoutState {
  final List<Exercise> exercises;

  const ExercisesLoaded(this.exercises);

  @override
  List<Object?> get props => [exercises];
}

// 訓練開始成功
class WorkoutStarted extends WorkoutState {
  final Workout workout;

  const WorkoutStarted(this.workout);

  @override
  List<Object?> get props => [workout];
}

// 訓練中狀態
class WorkoutInProgress extends WorkoutState {
  final Workout workout;
  final List<WorkoutSet> workoutSets;

  const WorkoutInProgress({required this.workout, this.workoutSets = const []});

  @override
  List<Object?> get props => [workout, workoutSets];
}

// 訓練完成狀態
class WorkoutCompleted extends WorkoutState {
  final Workout workout;
  final List<WorkoutSet> workoutSets;

  const WorkoutCompleted({required this.workout, required this.workoutSets});

  @override
  List<Object?> get props => [workout, workoutSets];
}

// 訓練歷史加載成功
class WorkoutHistoryLoaded extends WorkoutState {
  final List<Workout> workouts;

  const WorkoutHistoryLoaded(this.workouts);

  @override
  List<Object?> get props => [workouts];
}
