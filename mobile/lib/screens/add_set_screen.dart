import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../blocs/workout/workout_bloc.dart';
import '../blocs/workout/workout_event.dart';
import '../blocs/workout/workout_state.dart';
import '../models/exercise.dart';
import '../models/workout_set.dart';

class AddSetScreen extends StatefulWidget {
  final Exercise exercise;

  const AddSetScreen({Key? key, required this.exercise}) : super(key: key);

  @override
  State<AddSetScreen> createState() => _AddSetScreenState();
}

class _AddSetScreenState extends State<AddSetScreen> {
  final List<SetInfo> _sets = [];
  final TextEditingController _weightController = TextEditingController();
  final TextEditingController _repsController = TextEditingController();

  @override
  void initState() {
    super.initState();
    // 初始添加一個空的組數
    _addEmptySet();
  }

  @override
  void dispose() {
    _weightController.dispose();
    _repsController.dispose();
    super.dispose();
  }

  void _addEmptySet() {
    setState(() {
      _sets.add(SetInfo(weight: 0, reps: 0));
    });
  }

  void _updateSet(int index, double weight, int reps) {
    setState(() {
      _sets[index] = SetInfo(weight: weight, reps: reps);
    });
  }

  void _deleteSet(int index) {
    setState(() {
      _sets.removeAt(index);
    });
  }

  void _saveWorkoutSet() {
    // 過濾掉空的組數
    final validSets =
        _sets.where((set) => set.weight > 0 && set.reps > 0).toList();

    if (validSets.isEmpty) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('請至少添加一組有效數據')));
      return;
    }

    // 獲取當前運動狀態
    final state = context.read<WorkoutBloc>().state;
    if (state is WorkoutInProgress) {
      // 添加組數
      context.read<WorkoutBloc>().add(
        AddWorkoutSet(
          exerciseId: widget.exercise.id,
          workoutName: widget.exercise.name,
          sets: validSets,
        ),
      );

      // 返回訓練頁面
      Navigator.pop(context);
    } else {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('無法添加組數：沒有進行中的訓練')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: Text(widget.exercise.name),
        centerTitle: true,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        actions: [
          // 添加保存按鈕到右上角
          TextButton(
            onPressed: _saveWorkoutSet,
            child: const Text(
              '保存',
              style: TextStyle(
                color: Colors.white,
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 運動信息卡片
          Container(
            margin: const EdgeInsets.all(16.0),
            padding: const EdgeInsets.all(16.0),
            decoration: BoxDecoration(
              color: Colors.grey[50],
              borderRadius: BorderRadius.circular(12),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  widget.exercise.name,
                  style: const TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  '目標肌群: ${widget.exercise.bodyPart}',
                  style: const TextStyle(fontSize: 16),
                ),
                const SizedBox(height: 4),
                Text(
                  '分類: ${widget.exercise.category}',
                  style: const TextStyle(fontSize: 16),
                ),
              ],
            ),
          ),

          // 添加組數標題
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Text(
              '添加組數',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Colors.grey[800],
              ),
            ),
          ),

          // 組數列表
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              itemCount: _sets.length,
              itemBuilder: (context, index) {
                return _buildSetRow(index);
              },
            ),
          ),

          // 底部按鈕
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Row(
              children: [
                Expanded(
                  child: OutlinedButton.icon(
                    onPressed: _addEmptySet,
                    icon: const Icon(Icons.add),
                    label: const Text('添加組數'),
                    style: OutlinedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(30),
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: ElevatedButton(
                    onPressed: _saveWorkoutSet,
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      backgroundColor: Colors.blue[700],
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(30),
                      ),
                    ),
                    child: const Text(
                      '保存',
                      style: TextStyle(fontSize: 16, color: Colors.white),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // 構建單個組數輸入行
  Widget _buildSetRow(int index) {
    final set = _sets[index];

    return Container(
      margin: const EdgeInsets.only(bottom: 16.0),
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: Colors.grey[100],
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          // 組數標籤
          Container(
            width: 60,
            alignment: Alignment.center,
            child: Text(
              '組 ${index + 1}',
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            ),
          ),

          // 重量輸入
          Expanded(
            child: Container(
              margin: const EdgeInsets.symmetric(horizontal: 8.0),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: Colors.grey[300]!),
              ),
              child: TextField(
                keyboardType: TextInputType.number,
                textAlign: TextAlign.center,
                decoration: const InputDecoration(
                  labelText: '重量 (kg)',
                  border: InputBorder.none,
                  contentPadding: EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 12,
                  ),
                ),
                controller: TextEditingController(
                  text: set.weight > 0 ? set.weight.toString() : '',
                ),
                onChanged: (value) {
                  final weight = double.tryParse(value) ?? 0;
                  _updateSet(index, weight, set.reps);
                },
              ),
            ),
          ),

          // 次數輸入
          Expanded(
            child: Container(
              margin: const EdgeInsets.symmetric(horizontal: 8.0),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: Colors.grey[300]!),
              ),
              child: TextField(
                keyboardType: TextInputType.number,
                textAlign: TextAlign.center,
                decoration: const InputDecoration(
                  labelText: '次數',
                  border: InputBorder.none,
                  contentPadding: EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 12,
                  ),
                ),
                controller: TextEditingController(
                  text: set.reps > 0 ? set.reps.toString() : '',
                ),
                onChanged: (value) {
                  final reps = int.tryParse(value) ?? 0;
                  _updateSet(index, set.weight, reps);
                },
              ),
            ),
          ),

          // 刪除按鈕
          IconButton(
            icon: Icon(Icons.delete, color: Colors.grey[600]),
            onPressed: () => _deleteSet(index),
          ),
        ],
      ),
    );
  }
}
