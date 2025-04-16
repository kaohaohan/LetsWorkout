import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:intl/intl.dart';
import '../blocs/workout/workout_bloc.dart';
import '../blocs/workout/workout_event.dart';
import '../blocs/workout/workout_state.dart';
import '../models/workout.dart';

class HistoryScreen extends StatelessWidget {
  const HistoryScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('訓練歷史'), centerTitle: true),
      body: BlocBuilder<WorkoutBloc, WorkoutState>(
        builder: (context, state) {
          if (state is WorkoutHistoryLoaded) {
            if (state.workouts.isEmpty) {
              return const Center(child: Text('尚無訓練記錄'));
            }

            return ListView.builder(
              padding: const EdgeInsets.all(16.0),
              itemCount: state.workouts.length,
              itemBuilder: (context, index) {
                final workout = state.workouts[index];
                return _buildWorkoutHistoryItem(context, workout);
              },
            );
          }

          if (state is WorkoutLoading) {
            return const Center(child: CircularProgressIndicator());
          }

          if (state is WorkoutError) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('錯誤: ${state.message}'),
                  ElevatedButton(
                    onPressed: () {
                      context.read<WorkoutBloc>().add(LoadWorkoutHistory());
                    },
                    child: const Text('重試'),
                  ),
                ],
              ),
            );
          }

          // 主動加載歷史記錄
          WidgetsBinding.instance.addPostFrameCallback((_) {
            context.read<WorkoutBloc>().add(LoadWorkoutHistory());
          });

          return const Center(child: CircularProgressIndicator());
        },
      ),
    );
  }

  // 構建訓練歷史項目
  Widget _buildWorkoutHistoryItem(BuildContext context, Workout workout) {
    // 格式化日期和時間
    final dateFormat = DateFormat('yyyy/MM/dd');
    final timeFormat = DateFormat('HH:mm');
    final formattedDate = dateFormat.format(workout.startTime);
    final formattedStartTime = timeFormat.format(workout.startTime);
    final formattedEndTime =
        workout.endTime != null ? timeFormat.format(workout.endTime!) : '進行中';

    // 格式化訓練時長
    String durationText = '進行中';
    if (workout.duration != null) {
      final duration = Duration(seconds: workout.duration!);
      durationText = '${duration.inHours}小時 ${duration.inMinutes % 60}分鐘';
    }

    // 訓練狀態顏色
    Color statusColor = Colors.green;
    if (workout.status == 'in_progress') {
      statusColor = Colors.blue;
    } else if (workout.status == 'cancelled') {
      statusColor = Colors.red;
    }

    return Card(
      margin: const EdgeInsets.only(bottom: 16.0),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 訓練名稱和狀態
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  workout.name,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Chip(
                  label: Text(
                    _getStatusText(workout.status),
                    style: const TextStyle(color: Colors.white),
                  ),
                  backgroundColor: statusColor,
                ),
              ],
            ),

            const SizedBox(height: 8),

            // 訓練日期和時間
            Row(
              children: [
                const Icon(Icons.calendar_today, size: 16),
                const SizedBox(width: 4),
                Text(formattedDate),
                const SizedBox(width: 16),
                const Icon(Icons.access_time, size: 16),
                const SizedBox(width: 4),
                Text('$formattedStartTime - $formattedEndTime'),
              ],
            ),

            // 訓練時長
            if (workout.duration != null)
              Padding(
                padding: const EdgeInsets.only(top: 4.0),
                child: Row(
                  children: [
                    const Icon(Icons.timelapse, size: 16),
                    const SizedBox(width: 4),
                    Text(durationText),
                  ],
                ),
              ),

            // 訓練備註
            if (workout.notes.isNotEmpty)
              Padding(
                padding: const EdgeInsets.only(top: 8.0),
                child: Text(
                  workout.notes,
                  style: const TextStyle(fontStyle: FontStyle.italic),
                ),
              ),

            // 運動數量
            Padding(
              padding: const EdgeInsets.only(top: 8.0),
              child: Text('共 ${workout.exercises.length} 個運動'),
            ),
          ],
        ),
      ),
    );
  }

  // 根據狀態返回文本
  String _getStatusText(String status) {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'in_progress':
        return '進行中';
      case 'cancelled':
        return '已取消';
      default:
        return status;
    }
  }
}
