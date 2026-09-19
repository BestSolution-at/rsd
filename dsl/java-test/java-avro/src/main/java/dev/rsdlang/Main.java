package dev.rsdlang;

import java.io.IOException;
import java.net.InetSocketAddress;

import javax.xml.validation.Schema;

import org.apache.avro.SchemaParser;
import org.apache.avro.ipc.Server;
import org.apache.avro.ipc.netty.NettyServer;
import org.apache.avro.ipc.netty.NettyTransceiver;
import org.apache.avro.ipc.specific.SpecificRequestor;
import org.apache.avro.ipc.specific.SpecificResponder;

import dev.rsdlang.sample.avro.SampleEnum;
import dev.rsdlang.sample.avro.SampleError;
import dev.rsdlang.sample.avro.SampleError2;
import dev.rsdlang.sample.avro.SampleErrorBoolean;
import dev.rsdlang.sample.avro.SampleErrorEnum;
import dev.rsdlang.sample.avro.SampleErrorInt;
import dev.rsdlang.sample.avro.SampleErrorScalar;
import dev.rsdlang.sample.avro.SampleErrorUnion;
import dev.rsdlang.sample.avro.SampleErrorWithValue;
import dev.rsdlang.sample.avro.SampleService;
import dev.rsdlang.sample.avro.SimpleRecord;

public class Main {
	public static class SampleServiceImpl implements SampleService {

		@Override
		public boolean getBoolean() {
			return true;
		}

		@Override
		public int getShort() {
			// TODO Auto-generated method stub
			throw new UnsupportedOperationException("Unimplemented method 'getShort'");
		}

		@Override
		public int getInt() {
			// TODO Auto-generated method stub
			throw new UnsupportedOperationException("Unimplemented method 'getInt'");
		}

		@Override
		public long getLong() {
			// TODO Auto-generated method stub
			throw new UnsupportedOperationException("Unimplemented method 'getLong'");
		}

		@Override
		public float getFloat() {
			// TODO Auto-generated method stub
			throw new UnsupportedOperationException("Unimplemented method 'getFloat'");
		}

		@Override
		public double getDouble() {
			// TODO Auto-generated method stub
			throw new UnsupportedOperationException("Unimplemented method 'getDouble'");
		}

		@Override
		public CharSequence getString() {
			// TODO Auto-generated method stub
			throw new UnsupportedOperationException("Unimplemented method 'getString'");
		}

		@Override
		public CharSequence getLocalDate() {
			// TODO Auto-generated method stub
			throw new UnsupportedOperationException("Unimplemented method 'getLocalDate'");
		}

		@Override
		public CharSequence getLocalDateTime() {
			// TODO Auto-generated method stub
			throw new UnsupportedOperationException("Unimplemented method 'getLocalDateTime'");
		}

		@Override
		public CharSequence getLocalTime() {
			// TODO Auto-generated method stub
			throw new UnsupportedOperationException("Unimplemented method 'getLocalTime'");
		}

		@Override
		public CharSequence getOffsetDateTime() {
			// TODO Auto-generated method stub
			throw new UnsupportedOperationException("Unimplemented method 'getOffsetDateTime'");
		}

		@Override
		public CharSequence getZonedDateTime() {
			// TODO Auto-generated method stub
			throw new UnsupportedOperationException("Unimplemented method 'getZonedDateTime'");
		}

		@Override
		public CharSequence getScalar() {
			// TODO Auto-generated method stub
			throw new UnsupportedOperationException("Unimplemented method 'getScalar'");
		}

		@Override
		public SampleEnum getEnum() {
			// TODO Auto-generated method stub
			throw new UnsupportedOperationException("Unimplemented method 'getEnum'");
		}

		@Override
		public void voidOperation() {
			// TODO Auto-generated method stub
			throw new UnsupportedOperationException("Unimplemented method 'voidOperation'");
		}

		@Override
		public void errorOperation() throws SampleError {
			// TODO Auto-generated method stub
			throw new UnsupportedOperationException("Unimplemented method 'errorOperation'");
		}

		@Override
		public void multiErrorOperation() throws SampleError, SampleError2 {
			// TODO Auto-generated method stub
			throw new UnsupportedOperationException("Unimplemented method 'multiErrorOperation'");
		}

		@Override
		public SimpleRecord getSimpleRecord(CharSequence key) {
			// TODO Auto-generated method stub
			throw new UnsupportedOperationException("Unimplemented method 'getSimpleRecord'");
		}

		@Override
		public SimpleRecord getSimpleRecordWithError(CharSequence key) throws SampleError {
			// TODO Auto-generated method stub
			throw new UnsupportedOperationException("Unimplemented method 'getSimpleRecordWithError'");
		}

		@Override
		public void getSimpleErrorWithValue() throws SampleErrorWithValue {
			// TODO Auto-generated method stub
			throw new UnsupportedOperationException("Unimplemented method 'getSimpleErrorWithValue'");
		}

		@Override
		public void getSimpleErrorInt() throws SampleErrorInt {
			// TODO Auto-generated method stub
			throw new UnsupportedOperationException("Unimplemented method 'getSimpleErrorInt'");
		}

		@Override
		public void getSimpleErrorBoolean() throws SampleErrorBoolean {
			// TODO Auto-generated method stub
			throw new UnsupportedOperationException("Unimplemented method 'getSimpleErrorBoolean'");
		}

		@Override
		public void getSimpleErrorEnum() throws SampleErrorEnum {
			// TODO Auto-generated method stub
			throw new UnsupportedOperationException("Unimplemented method 'getSimpleErrorEnum'");
		}

		@Override
		public void getSimpleErrorScalar() throws SampleErrorScalar {
			// TODO Auto-generated method stub
			throw new UnsupportedOperationException("Unimplemented method 'getSimpleErrorScalar'");
		}

		@Override
		public void getSimpleErrorUnion() throws SampleErrorUnion {
			// TODO Auto-generated method stub
			throw new UnsupportedOperationException("Unimplemented method 'getSimpleErrorUnion'");
		}

		@Override
		public void multiErrorSameCode(int errorType) throws SampleError, SampleError2, SampleErrorWithValue {
			// TODO Auto-generated method stub
			throw new UnsupportedOperationException("Unimplemented method 'multiErrorSameCode'");
		}
		// Implement the methods of SampleService here
	}

	private static Server server;

	private static void startServer() throws IOException, InterruptedException {
		server = new NettyServer(new SpecificResponder(SampleService.class, new SampleServiceImpl()),
				new InetSocketAddress(65111));
	}

	public static void main(String[] args) {
		try {
			startServer();
			System.out.println("Server started on port 65111");

			NettyTransceiver client = new NettyTransceiver(new InetSocketAddress(65111));
			SampleService clientProxy = (SampleService) SpecificRequestor.getClient(SampleService.class, client);
			System.out.println("Client built, got proxy");
			System.out.println("Result: " + clientProxy.getBoolean());
		} catch (IOException | InterruptedException e) {
			e.printStackTrace();
		}
	}
}
