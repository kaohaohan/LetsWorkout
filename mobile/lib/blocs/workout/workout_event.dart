import 'package:equatable/equatable.dart';
import '../../models/workout.dart';
import '../../models/workout_set.dart';
import '../../models/exercise.dart';

abstract class WorkoutEvent extends Equatable {
  const WorkoutEvent();

  @override
  List<Object?> get props => [];
}

// 加載運動項目列表
class LoadExercises extends WorkoutEvent {}

// 開始新訓練
class StartWorkout extends WorkoutEvent {
  final String? name;
  final String? notes;

  const StartWorkout({this.name, this.notes});

  @override
  List<Object?> get props => [name, notes];
}

// 完成訓練
class FinishWorkout extends WorkoutEvent {
  final String workoutId;

  const FinishWorkout(this.workoutId);

  @override
  List<Object?> get props => [workoutId];
}

// 取消訓練
class CancelWorkout extends WorkoutEvent {
  final String workoutId;

  const CancelWorkout(this.workoutId);

  @override
  List<Object?> get props => [workoutId];
}

// 添加訓練組數
class AddWorkoutSet extends WorkoutEvent {
  final String exerciseId;
  final String workoutName;
  final List<SetInfo> sets;

  const AddWorkoutSet({
    required this.exerciseId,
    required this.workoutName,
    required this.sets,
  });

  @override
  List<Object?> get props => [exerciseId, workoutName, sets];
}

// 加載訓練歷史
class LoadWorkoutHistory extends WorkoutEvent {}
